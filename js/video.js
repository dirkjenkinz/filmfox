$(() => {
    $("#btn-video").attr("disabled", true);
  }),
  $('.btn-generate').on('click', (e) => {
    const title = $('#filmTitle')[0].innerText;
    const sceneNumber = e.target.value;
    window.location.href = `/create-video?title=${title}&sceneNumber=${sceneNumber}`
  })
  $('#btn-back').on('click', () => {
    const fs = fs;
    const title = $('#filmTitle')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    window.location.href = `/display?title=${title}&sceneNumber=${sceneNumber}`;
  });   