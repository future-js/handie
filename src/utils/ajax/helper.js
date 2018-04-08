/**
 * 重置请求等待状态
 */
export function resetWaitStatus() {
  $(".modal:visible .js-waitForResult:visible").each(function() {
    const $layer = $(this);
    const $modal = $layer.closest(".modal");

    $layer.hide();
    $modal.removeClass("is-waiting");
    $("button", $(".modal-header, .modal-footer", $modal)).prop("disabled", false);
  });
}
