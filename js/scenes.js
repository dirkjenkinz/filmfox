$(() => {
  $("#btn-scenes").attr("disabled", true);
}),
   $('.btn-scene-shot-list').on('click', (e) => {
    const scene = e
      .target
      .value;
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/scene-shot-list?title=${title}&scene=${scene}`
  }),
  $(".note").on("focusout", (e) => {
    const val = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    const scene = e.target.id.substring(5);
    window.location.href = `/update-note?title=${title}&scene=${scene}&val=${val}&caller=scenes`
    });