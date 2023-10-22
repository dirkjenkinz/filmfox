  $('.btn-select').on('click', (e) => {
    const image = e.target.value;
    const title = $('#filmTitle')[0].innerText;
    const elementNumber = $('#elementNumber')[0].innerText
    const caller = $('#caller')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    window.location.href = `/update-image-display?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&image=${image}&caller=${caller}`
  })