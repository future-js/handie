import { isString, isArray, isPlainObject, inArray, arrayEach, arrayMap } from "../common/helper";
import { resolveFileExtension } from "../url/helper";
import { defaults } from "../common/settings";
import { STORAGE_KEY } from "../common/constants";
import { resolveTriggerOptionsSimply, resolveTriggerOptions, constructActionButton } from "./helper";

/**
 * 判断图片列的数量是否达到上限
 */
function isImageItemOverflow( $btn, limit ) {
  return $(".ImageItem:not(.ImageItem--add)", $btn.closest(".ImageList").parent()).length >= limit;
}

/**
 * 生成 `<figure class="ImageItem"></figure>`
 * 
 * @param {*} url 
 * @param {*} alt 
 * @param {*} removable 
 */
function generateImageItem( url, alt, removable ) {
  const html = [];

  alt = alt || "";

  let ext;

  if ( url && isString(url) ) {
    ext = resolveFileExtension(url);
  }

  html.push("<figure class=\"ImageItem");

  if ( url && ext && !inArray(ext.toLowerCase(), defaults.uploader.extension.image.split(",")) ) {
    html.push(" is-nongraphic");
  }

  html.push(`"><div><a href="${url || "javascript:void(0);"}" target="_blank" data-file-ext="${ext}"><img src="${url || ""}" alt="${alt}" title="${alt}"></a></div>`);

  if ( alt ) {
    html.push(`<figcaption class="u-textTruncate" title="${alt}">${alt}</figcaption>`);
  }

  if ( removable === true ) {
    html.push(`<button type="button" class="ImageItem-button fa fa-close js-removeUploadedImage" title="删除"><span class="sr-only"></span></button>`);
  }

  html.push("</figure>");

  return html.join("");
}

/**
 * 在上传图片按钮前插入图片
 * 
 * @param {*} opts 
 */
function insertImageItem( opts ) {
  let $btn = $(opts.$btn);
  let maxCount = opts.max;

  // 按钮不是图片上传按钮或图片列数量已达上限时跳出
  if ( !$btn.is(".ImageItem") || (maxCount && isImageItemOverflow($btn, maxCount)) ) {
    return;
  }

  let columnCount = Number(opts.column);

  if ( isNaN(columnCount) || columnCount <= 0 ) {
    columnCount = defaults.generator.imageColumnCount;
  }

  const listCls = "ImageList";
  const itemCls = "ImageList-item";

  let $btnCol = opts.$btn.closest(`.${itemCls}`);
  let $newCol = $(`<div class="${itemCls} col-sm-${12 / columnCount} is-dynamic" />`);

  // 生成并在上传按钮所在列之前插入新的图片列
  $newCol.html(generateImageItem(opts.url, opts.text, opts.removable));
  $btnCol.before($newCol);

  if ( isFunction(opts.callback) ) {
    opts.callback.call(null, $newCol, $btnCol);
  }

  let imageItemSize = $btnCol.siblings(`.${itemCls}`).length;

  // 当一行的图片列数量到达上限时将上传按钮插入新行
  if ( imageItemSize === columnCount ) {
    $(`.${listCls}:last`, opts.$el).after(`<div class="${listCls} row" />`);
    $(`.${listCls}:last`, opts.$el).append($btnCol);
  }

  if ( maxCount ) {
    let $btnRow = $btnCol.closest(`.${listCls}`);
    let hiddenCls = "u-hidden";

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
 * 将被删照片条目后面的条目前移
 */
function moveImageItemsForward( $item ) {
  let listCls = "ImageList";
  let itemCls = "ImageList-item";
  let hiddenCls = "u-hidden";

  let $list = $item.closest(`.${listCls}`);
  let $container = $list.parent();

  $((`.${listCls}:gt(` + $(`.${listCls}`, $container).index($list) + ")"), $container).each(function() {
    let $r = $(this);

    // 将当前行中第一列移到上一行末尾
    $r.prev(`.${listCls}`).append($(`.${itemCls}` + ":first", $r));

    // 当前行没有条目时移除
    if ($(`.${itemCls}`, $r).length === 0) {
      $r.remove();
    }
  });

  $item.closest(`.${itemCls}`).remove();

  let $btn = $(".ImageItem--add", $container);
  let maxCount = $btn.data(STORAGE_KEY.IMAGE_ITEM_MAX);

  if ( maxCount ) {
    let $btnCol = $btn.closest(`.${itemCls}`);

    $(`.${listCls}.${hiddenCls}`, $container).removeClass(hiddenCls);

    if ( !isImageItemOverflow($btn, maxCount) ) {
      $btnCol.removeClass(hiddenCls);
    }
    else if ( $btnCol.siblings(`.${itemCls}`).length === 0 ) {
      $btnCol.closest(`.${listCls}`).addClass(hiddenCls);
    }
  }
}

/**
 * 生成操作按钮
 */
export function action( actions, wrapped ) {
  actions = resolveTriggerOptionsSimply(actions);

  if ( isPlainObject(actions) ) {
    actions = [actions];
  }

  actions = actions.concat(defaults.table.rowActions);

  if ( !isArray(actions) ) {
    return false;
  }

  let html = arrayMap(actions, a => constructActionButton(a, {align: "right"}));

  if ( actions.length > 1 || wrapped === true ) {
    html.unshift(`<div class="OperationGroup">`);
    html.push("</div>");
  }

  return html.join("");
}

export function option( value = "", text = "", extra, selected ) {
  const attrs = [`class="is-dynamic"`, `value="${value}"`];

  if ( isPlainObject(extra) ) {
    arrayEach(extra, ( k, v ) => {
      attrs.push(`data-${k}="${v}"`);
    });
  }
  else {
    selected = extra;
  }

  if ( selected === true ) {
    attrs.push("selected");
  }

  return `<option ${attrs.join(" ")}>${text}</option>`
}

export {
  generateImageItem as image,
  insertImageItem as imageItem
}
