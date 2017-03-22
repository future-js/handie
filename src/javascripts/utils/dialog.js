let dialogLevel = 0;
const DIALOG_DEFAULT_INDEX = 1050;

if ( SUPPORTS.BS_MODAL ) {
  utils.dialog = {
    levelUp: function( $dlg ) {
      let $backdrop = $dlg.data("bs.modal").$backdrop;
      let increase = dialogLevel * 2 * 10;

      $dlg.css("z-index", DIALOG_DEFAULT_INDEX + increase);

      if ( $backdrop ) {
        $backdrop.css("z-index", DIALOG_DEFAULT_INDEX + increase - 10);
      }

      dialogLevel++;
    },
    levelDown: function( $dlg ) {
      let $backdrop = $dlg.data("bs.modal").$backdrop;

      $dlg.css("z-index", DIALOG_DEFAULT_INDEX);

      if ( $backdrop ) {
        $backdrop.css("z-index", DIALOG_DEFAULT_INDEX - 10);
      }

      dialogLevel--;
    },
    // 获取最顶级的对话框
    top: function() {
      return [].sort.call($(".modal:visible"), function( a, b ) {
        return $(a).css("z-index") * 1 < $(b).css("z-index") * 1;
      }).first();
    }
  };
}
