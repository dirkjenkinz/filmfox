$(() => {
  $("#btn-scenes").attr("disabled", true);
}),
   $('.btn-scene-shot-list').on('click', (e) => {
    const sceneNumber = e
      .target
      .value;
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/scene-shot-list?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $(".note").on("focusout", (e) => {
    const val = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    const sceneNumber = e.target.id.substring(5);
    window.location.href = `/update-note?title=${title}&sceneNumber=${sceneNumber}&val=${val}&caller=scenes`
    });