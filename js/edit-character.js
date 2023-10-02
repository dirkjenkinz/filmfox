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
  }),
  $('.btn-gen').on('click', (e) => {
    const elementNumber = e.target.value;
    const title = $('#title')[0].innerText;
    const voice = $('#current-voice')[0].innerText;
    window.location.href = `/generate-single?title=${title}&elementNumber=${elementNumber}&voice=${voice}&caller=edit-character`;
  })