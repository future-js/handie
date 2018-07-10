/**
 * 获取消除小数点所需要移动的位数
 * 
 * @param {*} a 
 * @param {*} b 
 */
function getMoveDigit( a, b ) {
  let _a, _b, la, lb;

  a = a.toString(10);
  b = b.toString(10);

  _a = a.split('.');
  _b = b.split('.');

  la = _a.length === 2 ? _a[1].length : 0;
  lb = _b.length === 2 ? _b[1].length : 0;

  return Math.max(la, lb);
}

/**
 * 向右移动小数点
 * 
 * @param {*} num 被操作的数字
 * @param {*} digit 移动的位数
 */
function move2Right( num, digit ) {
  let str, _num;

  if ( digit === 0 ) {
    return num;
  }

  num = num.toString(10);
  _num = num.split('.');
  str = _num[1] ? _num[1] : '';
  _num = _num[0];

  for (let i = 0; i < digit; i++) {
    _num += str[i] ? str[i] : '0';
  }

  return _num * 1;
}

/**
 * 向左移动小数点
 * 
 * @param {*} num 被操作的数字
 * @param {*} digit 移动的位数
 */
function move2Left( num, digit ) {
  if ( digit === 0 ) {
    return num;
  }

  let arr, len;

  num = num.toString();
  arr = num.split('.');

  if ( arr.length === 2 ) {
    digit += arr[1].length;
    num = num.replace('.', '');
  }

  arr = num.split('');
  len = num.length;

  for ( let i = 0; i < digit - len; i++ ) {
    arr.unshift('0');
  }

  arr.splice(arr.length - digit, 0, '.');

  return arr.join('') * 1;
}

/**
 * 加法运算
 * 
 * @param {*} a 加数
 * @param {*} b 加数
 */
export function plus( a, b ) {
  const d = getMoveDigit(a, b);

  return move2Left(move2Right(a, d) + move2Right(b, d), d);
}

/**
 * 减法运算
 * 
 * @param {*} a 减数
 * @param {*} b 被减数
 */
export function minus( a, b ) {
  const d = getMoveDigit(a, b);

  return move2Left(move2Right(a, d) - move2Right(b, d), d);
}

/**
 * 乘法运算
 * 
 * @param {*} a 被乘数
 * @param {*} b 乘数
 */
export function multiply( a, b ) {
  const d = getMoveDigit(a, b);

  return move2Left(move2Right(a, d) * move2Right(b, d), d * 2);
}

/**
 * 除法运算
 * 
 * @param {*} a 被除数
 * @param {*} b 除数
 */
export function divided( a, b ) {
  const d = getMoveDigit(a, b);

  return move2Right(a, d) / move2Right(b, d);
}
