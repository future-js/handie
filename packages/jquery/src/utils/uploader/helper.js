import { resolveFileExtension } from '../url/helper';

export function setImageItemUrl( $item, url ) {
  $('a', $item).attr({'href': (url || 'javascript:void(0);'), 'data-file-ext': resolveFileExtension(url)});
  $('img', $item).attr('src', url);
}
