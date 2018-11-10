import * as http from './http';
import * as socket from './socket';
import * as calc from './calc';
import * as data from './data';
import * as generate from './generator';
import * as url from './url';
import * as text from './text';
import { setDefaults, set, get } from './storage';

window.handie = {
  setDefaults, set, get,
  http, socket,
  generate, text, calc,
  data, url,
  // 为了向后兼容的别名
  ajax: http,
  calculate: calc
};
