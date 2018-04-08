import { init as initWatermark } from "@mhc/watermark";
import { mixin, generateRandomId } from "../common/helper";
import { supportPointerEvents } from "../common/supports";
import { defaults } from "../common/settings";

export function watermark( opts ) {
  if ( !supportPointerEvents() ) {
    return;
  }

  opts = mixin(true, {}, defaults.watermark, {id: generateRandomId("watermark")}, opts);

  if ( opts.mainOnly !== false ) {
    opts.style["z-index"] = 9999;
  }

  return initWatermark(opts);
}
