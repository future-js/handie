import {
  isString, isArray, isFunction, isPlainObject,
  includes, each, map } from '../common/helper';
import { STORAGE_KEY } from '../common/constants';
import { setDefaults, getDefaults } from '../storage/helper';
import { resolveFileExtension } from '../url/helper';
import { resolveTriggerOptionsSimply, constructActionButton, isImageItemOverflow } from './helper';

import GENERATOR_DEFAULTS from './defaults';

setDefaults('generator', GENERATOR_DEFAULTS);

/**
 * 生成 `<figure class="ImageItem"></figure>`
 * 
 * @param {*} url 
 * @param {*} alt 
 * @param {*} removable 
 */
function generateImageItem( url, alt, removable ) {
  const html = [];

  alt = alt || '';

  let ext;

  if ( url && isString(url) ) {
    ext = resolveFileExtension(url);
  }

  html.push('<figure class="ImageItem');

  if ( url && ext && !includes(ext.toLowerCase(), getDefaults('uploader.extension.image').split(',')) ) {
    html.push(' is-nongraphic');
  }

  html.push(`"><div><a href="${url || 'javascript:void(0);'}" target="_blank" data-file-ext="${ext}"><img src="${url || ''}" alt="${alt}" title="${alt}"></a></div>`);

  if ( alt ) {
    html.push(`<figcaption class="u-textTruncate" title="${alt}">${alt}</figcaption>`);
  }

  if ( removable === true ) {
    html.push('<button type="button" class="ImageItem-button fa fa-close js-removeUploadedImage" title="删除"><span class="sr-only"></span></button>');
  }

  html.push("</figure>");

  return html.join('');
}

/**
 * 在上传图片按钮前插入图片
 * 
 * @param {*} opts 
 */
function insertImageItem( opts ) {
  const $btn = $(opts.$btn);
  const maxCount = opts.max;

  // 按钮不是图片上传按钮或图片列数量已达上限时跳出
  if ( !$btn.is('.ImageItem') || (maxCount && isImageItemOverflow($btn, maxCount)) ) {
    return;
  }

  let columnCount = Number(opts.column);

  if ( isNaN(columnCount) || columnCount <= 0 ) {
    columnCount = getDefaults('generator.imageColumnCount');
  }

  const listCls = 'ImageList';
  const itemCls = 'ImageList-item';
  
  const $btnCol = opts.$btn.closest(`.${itemCls}`);
  const $newCol = $(`<div class="${itemCls} col-sm-${12 / columnCount} is-dynamic" />`);

  // 生成并在上传按钮所在列之前插入新的图片列
  $newCol.html(generateImageItem(opts.url, opts.text, opts.removable));
  $btnCol.before($newCol);

  if ( isFunction(opts.callback) ) {
    opts.callback.call(null, $newCol, $btnCol);
  }

  const imageItemSize = $btnCol.siblings(`.${itemCls}`).length;

  // 当一行的图片列数量到达上限时将上传按钮插入新行
  if ( imageItemSize === columnCount ) {
    $(`.${listCls}:last`, opts.$el).after(`<div class="${listCls} row" />`);
    $(`.${listCls}:last`, opts.$el).append($btnCol);
  }

  if ( maxCount ) {
    let $btnRow = $btnCol.closest(`.${listCls}`);
    let hiddenCls = 'u-hidden';

    $btn.data(STORAGE_KEY.IMAGE_ITEM_MAX, maxCount);

    $(`.${listCls}.${hiddenCls}, .${itemCls}.${hiddenCls}`, $btnRow.parent()).removeClass(hiddenCls);

    // 全部图片列的数量到达上限时隐藏上传按钮
    if ( isImageItemOverflow($btnRow, maxCount) ) {
      $btnCol.addClass(hiddenCls);

      if ( imageItemSize === 0 ) {
        $btnRow.addClass(hiddenCls);
      }
    }
  }

  return $newCol;
}

/**
 * 生成操作按钮
 */
export function action( actions, wrapped ) {
  actions = resolveTriggerOptionsSimply(actions);

  if ( isPlainObject(actions) ) {
    actions = [actions];
  }

  actions = actions.concat(getDefaults('table.rowActions'));

  if ( !isArray(actions) ) {
    return false;
  }

  const html = map(actions, a => constructActionButton(a, {align: 'right'}));

  if ( actions.length > 1 || wrapped === true ) {
    html.unshift('<div class="OperationGroup">');
    html.push('</div>');
  }

  return html.join('');
}

export function option( value = '', text = '', extra, selected ) {
  const attrs = ['class="is-dynamic"', `value="${value}"`];

  if ( isPlainObject(extra) ) {
    each(extra, ( v, k ) => attrs.push(`data-${k}="${v}"`));
  }
  else {
    selected = extra;
  }

  if ( selected === true ) {
    attrs.push('selected');
  }

  return `<option ${attrs.join(' ')}>${text}</option>`
}

export {
  generateImageItem as image,
  insertImageItem as imageItem
}
