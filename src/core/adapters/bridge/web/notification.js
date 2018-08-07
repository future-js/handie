export default {
  alert( message, callback = function() {} ) {
    window.alert(message);

    callback();
  },
  confirm( message, agreed = function() {}, cancelled = function() {} ) {
    if ( window.confirm(message) ) {
      agreed();
    }
    else {
      cancelled();
    }
  }
}
