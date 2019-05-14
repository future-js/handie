import { isString } from '../is/type';
import { isUrl } from '../is/format';
import { includes, each } from '../collection';

/**
 * 创建一个临时 `<a>` 用于获取 URL 信息
 *
 * @param {*} url URL
 */
function createTemporaryLinkElement( url: string ): any {
  const el = document.createElement('a');

  el.setAttribute('href', url);

  return el;
}

/**
 * 获取指定 URL 片段
 *
 * @param {*} part 目标片段
 * @param {*} url URL
 */
export function sliceUrlPart( part: string, url: string ): string {
  if ( !isString(url) || !isUrl(url) && url.indexOf('URL_PLACEHOLDER') === -1 ) {
    url = window.location.href;
  }

  const result = createTemporaryLinkElement(url)[part];

  return includes(part, ['hash', 'search']) ? result.slice(1) : result;
}

/**
 * 获取指定 URL 的文件扩展名
 *
 * @param {*} url URL
 */
export function resolveFileExtension( url: string ): string {
  const segments = sliceUrlPart('pathname', url).split('\/');
  const length = segments.length;

  let fileName = segments[length - 1];

  if ( fileName === '' ) {
    fileName = segments[length - 2];
  }

  const ext = fileName.match(/\.([^\.]+)$/);

  return ext ? ext[1].toUpperCase() : '';
}

/**
 * 将查询字符串转换为 JSON 对象
 *
 * @param {*} str
 */
export function jsonifyQueryString( str: string ): object {
  const jsonData: any = {};

  each(str.split('&'), ( seg: string ) => {
    const pair = seg.split('=');

    jsonData[pair[0]] = decodeURIComponent(pair[1]);
  });

  return jsonData;
}
