import {
  isFunction, isPlainObject,
  each, hasOwnProp, keys, mixin } from '../common/helper';
import { setDefaults, getDefaults } from '../storage/helper';
import { imageItem as insertImageItem } from '../generator';
import { setImageItemUrl } from './helper';

import UPLOADER_DEFAULTS from './defaults';

setDefaults('uploader', UPLOADER_DEFAULTS);

/**
 * 为保证事件处理的顺序正常
 * 而将七牛上传中 `init` 参数传进来的
 * 在本插件中已封装处理的事件暂存
 */
function stashQiniuUploaderEvents( evts ) {
  let result = {
      qiniu: {},
      stashed: {}
    };

  if ( evts ) {
    each(['FilesAdded', 'BeforeUpload', 'FileUploaded'], name => {
      if ( isFunction(evts[name]) ) {
        result.stashed[name] = evts[name];

        delete evts[name];
      }
    });
  }

  result.qiniu = evts;

  return result;
}

function resolveUploader( settings, opts ) {
  settings = mixin(true, {multi_selection: false}, settings);

  const isDynamicUrl = isFunction(settings.url);

  if ( isDynamicUrl ) {
    settings.url = 'dynamicUrlPlaceholder';
  }

  let uploader;

  // 七牛上传插件
  if ( settings.uptoken ) {
    if ( !settings.runtimes ) {
      settings.runtimes = 'html5,flash,html4';
    }

    let processed = stashQiniuUploaderEvents(settings.init);

    settings.init = processed.qiniu;

    uploader = Qiniu.uploader(settings);

    uploader.__handie = processed.stashed;

    uploader.bind('FileUploaded', ( up, file, result ) => setImageItemUrl($(`[data-file-id="${file.id}"]`), `${up.getOption('domain')}${JSON.parse(result.response).key}`));
  }
  else {
    uploader = new plupload.Uploader(settings);

    uploader.bind('FileUploaded', ( up, file, result ) => {
      if ( isFunction(opts.getImageUrl) ) {
        setImageItemUrl($(`[data-file-id="${file.id}"]`), opts.getImageUrl(JSON.parse(result.response)));
      }
    });

    uploader.init();
  }

  uploader.bind('FilesAdded', ( up, files ) => {
    if ( isDynamicUrl ) {
      uploader.setOption('url', settings.url());
    }
  });

  uploader.bind('BeforeUpload', ( up, file ) => $(`[data-file-id="${file.id}"]`).addClass('is-uploading'));

  uploader.bind('FileUploaded', ( up, file ) => {
    const $item = $(`[data-file-id="${file.id}"]`);

    $item.removeClass('is-uploading');
    
    if ( /^image\/[^\/]+/gi.test(file.type) ) {
      $item.removeClass('is-nongraphic');
    }
    else {
      $item.addClass('is-nongraphic');
    }
  });

  return uploader;
}

function initSingleImageUploader( settings, opts ) {
  const uploader = resolveUploader(settings, opts);

  uploader.bind('FilesAdded', ( up, files ) => {
    const $item = $(settings.browse_button).siblings('.ImageItem');
    const file = files[0];

    setImageItemUrl($item, '');

    $item
      .removeClass('is-empty')
      .attr('data-file-id', file.id);
  });

  return uploader;
}

function initMultipleImageUploader( settings, opts ) {
  const uploader = resolveUploader(settings, opts);

  uploader.bind('FilesAdded', ( up, files ) => {
    const $btn = $(settings.browse_button);
    const $el = $btn.closest('.ImageList').parent();

    each(files, file => {
      insertImageItem({
        $btn,
        $el,
        text: file.name,
        column: opts.column,
        max: opts.limit,
        removable: true,
        callback: ( $newCol, $btnCol ) => {
          $('.ImageItem', $newCol).attr('data-file-id', file.id);

          if ( isFunction(opts.imageItemAdded) ) {
            opts.imageItemAdded.call(null, $newCol, $btnCol);
          }
        }
      });
    });
  });

  return uploader;
}

/**
 * opts:
 *  limit: 0,
 *  column: 3,
 *  draggable: true,
 *  imageItemAdded: function() { },
 *  getImageUrl: function( res ) { }
 *  settings: null
 */
export function image( $btn, opts ) {
  let initializer, uploader;

  $btn = $($btn);
  opts = mixin(true, {
    limit: getDefaults('uploader.limit'),
    draggable: getDefaults('uploader.draggable'),
    // Settings for Plupload
    settings: null
  }, opts);

  if ( isPlainObject(opts.settings) ) {
    const defaultSettings = {
        browse_button: $btn.get(0),
        filters: {
          mime_types: [{
            title: '图片文件',
            extensions: getDefaults('uploader.extension.image')
          }]
        }
      };

    if ( opts.draggable === true ) {
      defaultSettings.drop_element = $btn.get(0);
    }

    if ( $btn.siblings('.ImageItem').length > 0 ) {
      initializer = initSingleImageUploader;
      opts.settings.multi_selection = false;
    }
    else {
      initializer = initMultipleImageUploader;
    }

    uploader = initializer(mixin(true, defaultSettings, opts.settings), opts);

    if ( hasOwnProp('__handie', uploader) ) {
      each(keys(uploader.__handie), name => uploader.bind(name, uploader.__handie[name]));

      delete uploader.__handie;
    }
  }

  return uploader;
}
