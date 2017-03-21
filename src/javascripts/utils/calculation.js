/*====================
  数字计算相关
  ====================*/

function getMoveDigit( a, b ) {
  let _a, _b, la, lb;

  a = a.toString(10);
  b = b.toString(10);

  _a = a.split(".");
  _b = b.split(".");

  la = _a.length === 2 ? _a[1].length : 0;
  lb = _b.length === 2 ? _b[1].length : 0;

  return Math.max(la, lb);
}

function move2Right( num, digit ) {
  let str, _num;

  if ( digit === 0 ) {
    return num;
  }

  num = num.toString(10);
  _num = num.split(".");
  str = _num[1] ? _num[1] : "";
  _num = _num[0];

  for (let i = 0; i < digit; i++) {
    _num += str[i] ? str[i] : "0";
  }

  return _num * 1;
}

function move2Left( num, digit ) {
  if ( digit === 0 ) {
    return num;
  }

  let arr, len;

  num = num.toString();
  arr = num.split(".");

  if ( arr.length === 2 ) {
    digit += arr[1].length;
    num = num.replace(".", "");
  }

  arr = num.split("");
  len = num.length;

  for ( let i = 0; i < digit - len; i++ ) {
    arr.unshift("0");
  }

  arr.splice(arr.length - digit, 0, ".");

  return arr.join("") * 1;
}

utils.calculate = {
  plus: function( a, b ) {
    let d = getMoveDigit(a, b);

    return move2Left(move2Right(a, d) + move2Right(b, d), d);
  },
  minus: function( a, b ) {
    let d = getMoveDigit(a, b);

    return move2Left(move2Right(a, d) - move2Right(b, d), d);
  },
  multiply: function( a, b ) {
    let d = getMoveDigit(a, b);

    return move2Left(move2Right(a, d) * move2Right(b, d), d * 2);
  },
  divided: function( a, b) {
    let d = getMoveDigit(a, b);

    return move2Left(move2Right(a, d) / move2Right( b, d ), d);
  },
  move2Left: move2Left,
  move2Right: move2Right,
  getMoveDigit: getMoveDigit
};
