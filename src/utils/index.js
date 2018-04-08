import * as ajax from "./ajax";
import * as socket from "./socket";
import * as table from "./table";
import * as dialog from "./dialog";
import * as form from "./form";
import * as field from "./field";
import * as select from "./select";
import * as calculate from "./calc";
import * as data from "./data";
import * as generate from "./generator";
import * as lbs from "./lbs";
import * as url from "./url";
import * as notice from "./notification";
import * as text from "./text";
import * as upload from "./uploader";

import { watermark } from "./watermark";
import { setDefaults, set, get, alert, $el } from "./misc";

window.muu = {
  setDefaults, set, get, alert, $el,
  ajax, socket,
  table, dialog, form, field, select,
  generate, text, calculate,
  data, upload, url, lbs, notice,
  encrypt: {watermark}
};
