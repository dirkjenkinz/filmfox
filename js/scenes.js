  $('.btn-change').on('click', (e) => {
    const element = e
      .target
      .value;
    const title = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    window.location.href = `/gallery?title=${title}&element=${element}&ptr=${ptr}&caller=scenes`
  });
  $('.btn-edit-scene').on('click', (e) => {
    const scene = e
      .target
      .value;
    const title = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    window.location.href = `/edit-scene?title=${title}&scene=${scene}&ptr=${ptr}`
  }),
  $('#btn-back').on('click', (e) => {
    const title = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    window.location.href = `/display?title=${title}&ptr=${ptr}`
  })