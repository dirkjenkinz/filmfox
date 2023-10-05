$(() => {
  $("#btn-scenes").attr("disabled", true);
}),
  $('.btn-edit-scene').on('click', (e) => {
    const scene = e
      .target
      .value;
    const title = $('#title')[0].innerText;
    window.location.href = `/edit-scene?title=${title}&scene=${scene}`
  }),
  $('.btn-edit-shot-list').on('click', (e) => {
    const scene = e
      .target
      .value;
    const title = $('#title')[0].innerText;
    window.location.href = `/edit-shot-list?title=${title}&scene=${scene}`
  }),
  $(".note").on("focusout", (e) => {
    const val = e.target.value;
    const title = $("#title")[0].outerText;
    const scene = e.target.id.substring(5);
    window.location.href = `/update-note?title=${title}&scene=${scene}&val=${val}&caller=scenes`
    });