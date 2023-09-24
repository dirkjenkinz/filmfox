$('#btn-back').on('click', () => {
    const title = $('#title')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    window.location.href = `/characters?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $('.btn-play').on('click', (e) => {
    const title = $('#title')[0].innerText;
    element = e.target.value;
    s = '../data/' + title + '/sounds/' + element;
    document
      .getElementById("master-play")
      .setAttribute('src', s);
    document
      .getElementById("master-play")
      .play();
  })