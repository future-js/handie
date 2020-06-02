import {
  isString,
  isFunction,
  isPlainObject,
  isUrl,
  hasOwnProp,
  each,
  last,
  mixin,
  setDefaults,
  getDefaults,
} from '@ntks/toolbox';
import { supportPlupload, supportQiniu } from './helper';

import UPLOADER_DEFAULTS from './defaults';

setDefaults('uploader', UPLOADER_DEFAULTS);

/**
 * 提取可用的获取七牛 uptoken 的配置项
 *
 * @param {*} settings
 */
function pickUpAvailableUptoken(settings: any): any {
  return hasOwnProp('uptoken', settings)
    ? 'uptoken'
    : isString(settings.uptoken_url)
    ? 'uptoken_url'
    : isFunction(settings.uptoken_func)
    ? 'uptoken_func'
    : false;
}

/**
 * 处理七牛 uptoken 相关配置项
 *
 * @param {*} settings
 * @param {*} key
 */
function resolveUptoken(settings: any, key: string): any {
  const val = settings[key];

  if (key === 'uptoken') {
    if (isFunction(val)) {
      key = 'uptoken_func';
    } else if (isString(val) && isUrl(val)) {
      key = 'uptoken_url';
    }
  }

  each(['uptoken', 'uptoken_url', 'uptoken_func'], (k: string) => delete settings[k]);

  settings[key] = val;

  return settings;
}

/**
 * 处理七牛通过配置项传进来的事件处理函数
 *
 * @param {*} evts
 */
function resolveEvents(evts: any): any {
  const storage: any = {
    reserved: {},
    stashed: {},
  };

  if (isPlainObject(evts)) {
    each(evts, (handler: Function, name: string) => (storage[name === 'Key' ? 'reserved' : 'stashed'][name] = handler));
  }

  return storage;
}

/**
 * 初始化文件上传成功回调处理函数
 *
 * @param {Function} fn 上传结果回调处理函数
 * @param {Function} urlResolver
 */
function initFileUploadedHandler(fn: Function, urlResolver: Function): Function {
  return (...args: any[]) => fn(urlResolver(JSON.parse(supportQiniu() ? last(args) : last(args).response)), ...args);
}

function resolveUploader(settings: any, opts: any): any {
  const { immediate, hooks } = opts;
  const uptoken = pickUpAvailableUptoken(settings);
  const events = resolveEvents(settings.init);

  let urlResolver = opts.resolver;
  let uploader: any;

  if (uptoken && supportQiniu()) {
    settings = resolveUptoken(
      mixin(
        {
          runtimes: 'html5,flash,html4',
          dragdrop: opts.draggable,
          auto_start: immediate,
          domain: opts.domain,
          unique_names: true,
        },
        settings,
      ),
      uptoken,
    );

    settings.init = events.reserved;

    if (hasOwnProp('Key', settings.init)) {
      settings.unique_names = false;
    }

    delete settings.url;

    if (!isFunction(urlResolver)) {
      urlResolver = (res: any) => `${uploader.getOption('domain')}${res.key}`;
    }

    if (isFunction(hooks.upload)) {
      settings.init.FileUploaded = initFileUploadedHandler(hooks.upload, urlResolver);
    }

    uploader = Qiniu.uploader(settings);
  } else {
    let urlMaker: any;

    if (isFunction(settings.url)) {
      urlMaker = settings.url;
      settings.url = 'DYNAMIC_URL_PLACEHOLDER';
    }

    if (!isFunction(urlResolver)) {
      urlResolver = (res: any) => (isPlainObject(res) && hasOwnProp('url', res) ? res.url : res);
    }

    uploader = new plupload.Uploader(settings);

    uploader.init();

    if (urlMaker) {
      uploader.bind('FilesAdded', () => uploader.setOption('url', urlMaker()));
    }

    if (immediate) {
      uploader.bind('FilesAdded', () => uploader.start());
    }

    if (isFunction(hooks.upload)) {
      uploader.bind('FileUploaded', initFileUploadedHandler(hooks.upload, urlResolver));
    }
  }

  each(events.stashed, (handler: Function, name: string) => uploader.bind(name, handler));

  return uploader;
}

function initUploader(opts: any): any {
  const {
    multiple,
    draggable,
    immediate,
    max,
    cdn: { domain },
  } = getDefaults('uploader');

  opts = mixin({ draggable, immediate, max, domain, hooks: {} }, opts);

  if (!supportPlupload() || !hasOwnProp('el', opts) || !isPlainObject(opts.settings)) {
    return;
  }

  const settings: any = {
    browse_button: opts.el,
    multi_selection: multiple,
    filters: {
      prevent_duplicates: true,
    },
  };

  if (draggable === true) {
    settings.drop_element = opts.el;
  }

  return resolveUploader(mixin(true, settings, opts.settings), opts);
}

export { initUploader as init };
