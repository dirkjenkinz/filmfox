  $('.btn-change').on('click', (e) => {
    const element = e
      .target
      .value;
    const title = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    const scene = $('#scene')[0].innerText;
    window.location.href = `/gallery?title=${title}&element=${element}&scene=${scene}&caller=edit-scene`
  }),
  $('#btn-back').on('click', (e) => {
    console.log({e})
    const title = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    window.location.href = `/scenes?title=${title}&ptr='ptr`;
  })