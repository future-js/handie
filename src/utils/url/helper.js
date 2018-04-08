import { pathname } from ".";

export { jsonifyQueryString } from "@mhc/ntks/utils/helper/url";

/**
 * 获取指定 URL 的文件扩展名
 * 
 * @param {*} url URL
 */
export function resolveFileExtension( url ) {
  const segments = pathname(url).split("\/");
  const length = segments.length;

  let fileName = segments[length - 1];

  if ( fileName === "" ) {
    fileName = segments[length - 2];
  }

  const ext = fileName.match(/\.([^\.]+)$/);

  return ext ? ext[1].toUpperCase() : "";
}
