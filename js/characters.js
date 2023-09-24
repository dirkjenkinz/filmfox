  $('.btn-edit-character').on('click', (e) => {
    const character = e
      .target
      .value;
    const title = $('#title')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    window.location.href = `/edit-character?title=${title}&character=${character}`
  }),
  $('#btn-back').on('click', (e) => {
    const title = $('#title')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    window.location.href = `/display?title=${title}&sceneNumber=${sceneNumber}`
  })