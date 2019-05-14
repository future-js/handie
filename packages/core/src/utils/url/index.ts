import { isString } from '../is/type';
import { sliceUrlPart, jsonifyQueryString } from './helper';

function generateUrlUtil( part: string ): Function {
  return ( url: string ) => sliceUrlPart(part, url);
}

const urlSearchUtil = generateUrlUtil('search');

export const href = generateUrlUtil('href');

export const protocol = generateUrlUtil('protocol');

export const host = generateUrlUtil('host');

export const hostname = generateUrlUtil('hostname');

export const port = generateUrlUtil('port');

export const pathname = generateUrlUtil('pathname');

export const hash = generateUrlUtil('hash');

export const username = generateUrlUtil('username');

export const password = generateUrlUtil('password');

export const origin = generateUrlUtil('origin');

export function query( url: string, key: string ): string {
  const defaultUrl = window.location.href;
  const length = arguments.length;

  if ( length === 1 && isString(url) && url.indexOf('http') === -1 ) {
    key = url;
    url = defaultUrl;
  }

  if ( !isString(url) ) {
    url = defaultUrl;
  }

  const jsonified: any = jsonifyQueryString(urlSearchUtil(url));

  return key == null ? jsonified : jsonified[key];
}

export {
  urlSearchUtil as search
}
