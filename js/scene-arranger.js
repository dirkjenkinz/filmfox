$(() => {
  $("#btn-scene-arranger").attr("disabled", true);
}),
$("#btn-display-full").on("click", (e) => {
  const title = $("#title")[0].innerText;
  window.location.href = `/master-shot-list?title=${title}&full=yes`;
}),
  $(".btn-hide").on("click", (e) => {
    const num = e.target.value;
    $(`#table-shots-list-${num}`).toggle();
  }),
  $("#btn-hide-all").on("click", () => {
    const length = $("#size")[0].innerText;
    for (let num = 0; num < length; num++) {
      $(`#table-shots-list-${num}`).hide();
    }
  }),
  $("#btn-reveal-all").on("click", () => {
    const length = $("#size")[0].innerText;
    for (let num = 0; num < length; num++) {
      $(`#table-shots-list-${num}`).show();
    }
  }),
   $(".btn-down").on("click", (e) => {
    const size = $("#size")[0].innerText;
    const hidden = [];
    for (let i = 0; i < size; i++) {
      hidden.push($(`#table-shots-list-${i}`).is(":hidden"));
    };
    const num = e.target.value;
    const title = $("#title")[0].innerText;
    window.location.href = `/change-scene-order?title=${title}&direction=down&num=${num}&hidden=${hidden}`;
  }),
  $(".btn-up").on("click", (e) => {
    const size = $("#size")[0].innerText;
    const hidden = [];
    for (let i = 0; i < size; i++) {
      hidden.push($(`#table-shots-list-${i}`).is(":hidden"));
    };
    const num = e.target.value;
    const title = $("#title")[0].innerText;
    window.location.href = `/change-scene-order?title=${title}&direction=up&num=${num}&hidden=${hidden}`
  });
