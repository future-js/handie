import { toString, isLooseObject } from '@ntks/toolbox';

/**
 * Content below modified from https://github.com/lodash/lodash/blob/4.17.15/lodash.js
 */

const reTrim = /^\s+|\s+$/g;

const reIsBinary = /^0b[01+]$/i;
const reIsOctal = /^0o[0-7]+$/i;
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

const INFINITY = 1 / 0;
const MAX_INTEGER = 1.7976931348623157e+308; // eslint-disable-line prettier/prettier

function isObjectLike(value: any): boolean {
  return value != null && isLooseObject(value);
}

function isSymbol(value: any): boolean {
  return (
    typeof value === 'symbol' || (isObjectLike(value) && toString(value) === '[object Symbol]')
  );
}

function isObjectFromLodash(value: any): boolean {
  return value != null && (isLooseObject(value) || typeof value === 'function');
}

function toNumber(value: any): number {
  const valueType = typeof value;

  if (valueType === 'number') {
    return value;
  }

  if (isSymbol(value)) {
    return NaN;
  }

  let resolved = value;

  if (isObjectFromLodash(value)) {
    const other = typeof value.valueOf === 'function' ? value.valueOf() : value;

    resolved = isObjectFromLodash(other) ? other + '' : other;
  }

  if (typeof resolved !== 'string') {
    return resolved === 0 ? resolved : +resolved;
  }

  resolved = resolved.replace(reTrim, '');

  const isBinary = reIsBinary.test(resolved);

  return isBinary || reIsOctal.test(resolved)
    ? parseInt(resolved.slice(2), isBinary ? 2 : 8)
    : reIsBadHex.test(resolved)
    ? NaN
    : +resolved;
}

function toFinite(value: any): number {
  if (!value) {
    return value === 0 ? value : 0;
  }

  const resolved = toNumber(value);

  if (resolved === INFINITY || resolved === -INFINITY) {
    const sign = resolved < 0 ? -1 : 1;

    return sign * MAX_INTEGER;
  }

  return resolved === resolved ? resolved : 0; // eslint-disable-line no-self-compare
}

function toInteger(value: any): number {
  const result = toFinite(value);
  const remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0; // eslint-disable-line no-self-compare
}

function isInteger(value: any): boolean {
  return Number.isInteger
    ? Number.isInteger(value)
    : typeof value === 'number' && value === toInteger(value);
}

export { toNumber, toFinite, toInteger, isInteger };
