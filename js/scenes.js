$(() => {
  $("#btn-scenes").attr("disabled", true);
}),
  $('.btn-change').on('click', (e) => {
    const element = e
      .target
      .value;
    const title = $('#title')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    window.location.href = `/gallery?title=${title}&element=${element}&sceneNumber=${sceneNumber}&caller=scenes`
  });
  $('.btn-edit-scene').on('click', (e) => {
    const scene = e
      .target
      .value;
    const title = $('#title')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    window.location.href = `/edit-scene?title=${title}&scene=${scene}&sceneNumber=${sceneNumber}`
  }),
  $('#btn-back').on('click', (e) => {
    const title = $('#title')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    window.location.href = `/display?title=${title}&sceneNumber=${sceneNumber}`
  })