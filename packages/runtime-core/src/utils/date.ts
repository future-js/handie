import dayjs, { ConfigType, OptionType, Dayjs } from 'dayjs';

import { divided } from '../vendors/toolbox';

import { DateValue } from '../types';

function createMoment(
  date?: ConfigType,
  format?: OptionType,
  strictOrLocale?: boolean | string,
  strict?: boolean,
): Dayjs {
  return dayjs(date, format, strictOrLocale as any, strict);
}

function resolveDateValue(date: Date | null, format: string): DateValue {
  if (!date) {
    return '';
  }

  // JS timestamp
  if (format === 'timestamp') {
    return date.getTime();
  }

  // Unix timestamp
  if (format === 'unix') {
    return divided(date.getTime(), 1000);
  }

  return createMoment(date).format(format);
}

export { createMoment, resolveDateValue };
