export default {
  alert( message: string, callback: Function = function() {} ): void {
    window.alert(message);

    callback();
  },
  confirm( message: string, agreed: Function = function() {}, cancelled: Function = function() {} ): void {
    if ( window.confirm(message) ) {
      agreed();
    }
    else {
      cancelled();
    }
  }
}
