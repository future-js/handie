import { hasOwnProp } from '../common/helper';
import { isString, isFunction, isPlainObject } from '../is/type';
import { isUrl } from '../is/format';
import { each, last, mixin } from '../collection';
import { setDefaults, getDefaults } from '../storage/helper';
import { supportPlupload, supportQiniu } from './helper';

import UPLOADER_DEFAULTS from './defaults';

setDefaults('uploader', UPLOADER_DEFAULTS);

/**
 * 提取可用的获取七牛 uptoken 的配置项
 * 
 * @param {*} settings 
 */
function pickUpAvailableUptoken( settings ) {
  return hasOwnProp('uptoken', settings) ? 'uptoken' :
    isString(settings.uptoken_url) ? 'uptoken_url' :
    isFunction(settings.uptoken_func) ? 'uptoken_func' : false;
}

/**
 * 处理七牛 uptoken 相关配置项
 * 
 * @param {*} settings 
 * @param {*} key 
 */
function resolveUptoken( settings, key ) {
  const val = settings[key];

  if ( key === 'uptoken' ) {
    if ( isFunction(val) ) {
      key = 'uptoken_func';
    }
    else if ( isString(val) && isUrl(val) ) {
      key = 'uptoken_url';
    }
  }

  each(['uptoken', 'uptoken_url', 'uptoken_func'], k => delete settings[k]);

  settings[key] = val;

  return settings;
}

/**
 * 处理七牛通过配置项传进来的事件处理函数
 * 
 * @param {*} evts 
 */
function resolveEvents( evts ) {
  const storage = {
      reserved: {},
      stashed: {}
    };
  
  if ( isPlainObject(evts) ) {
    each(evts, ( handler, name ) => (storage[name === 'Key' ? 'reserved' : 'stashed'][name] = handler));
  }
  
  return storage;
}

function resolveUploader( settings, opts ) {
  const { immediate, hooks } = opts;
  const uptoken = pickUpAvailableUptoken(settings);
  const events = resolveEvents(settings.init);

  let urlResolver = opts.resolver;
  let uploader;

  if ( uptoken && supportQiniu() ) {
    settings = resolveUptoken(mixin({
        runtimes: 'html5,flash,html4',
        dragdrop: opts.draggable,
        auto_start: immediate,
        domain: opts.domain,
        unique_names: true
      }, settings), uptoken);

    settings.init = events.reserved;

    if ( hasOwnProp('Key', settings.init) ) {
      settings.unique_names = false;
    }

    delete settings.url;

    uploader = Qiniu.uploader(settings);
    
    if ( !isFunction(urlResolver) ) {
      urlResolver = res => `${uploader.getOption("domain")}${res.key}`;
    }
  }
  else {
    let urlMaker;

    if ( isFunction(settings.url) ) {
      urlMaker = settings.url;
      settings.url = 'DYNAMIC_URL_PLACEHOLDER';
    }

    if ( !isFunction(urlResolver) ) {
      urlResolver = res => isPlainObject(res) && hasOwnProp('url', res) ? res.url : res;
    }
  
    uploader = new plupload.Uploader(settings);

    uploader.init();

    if ( urlMaker ) {
      uploader.bind('FilesAdded', () => uploader.setOption('url', urlMaker()));
    }

    if ( immediate ) {
      uploader.bind('FilesAdded', () => uploader.start());
    }
  }

  if ( isFunction(hooks.upload) ) {
    uploader.bind('FileUploaded', ( ...args ) => hooks.upload(
      urlResolver(JSON.parse(last(args).response)),
      ...args
    ));
  }

  each(events.stashed, ( handler, name ) => uploader.bind(name, handler));

  return uploader;
}

function initUploader( opts ) {
  const { multiple, draggable, immediate, max, cdn: { domain } } = getDefaults('uploader');

  opts = mixin({draggable, immediate, max, domain, hooks: {}}, opts);
  
  if ( !supportPlupload() || !hasOwnProp('el', opts) || !isPlainObject(opts.settings) ) {
    return;
  }

  const settings = {
      browse_button: opts.el,
      multi_selection: multiple,
      filters: {
        prevent_duplicates: true
      }
    };
  
  if ( draggable === true ) {
    settings.drop_element = opts.el;
  }

  return resolveUploader(mixin(true, settings, opts.settings), opts);
}

export {
  initUploader as init
}
