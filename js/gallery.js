$('.imcg').on('click', (e) => {
    const f = $('#title')[0].innerText
    const ptr = $('#ptr')[0].innerText
    const i = $('#element')[0].innerText;
    const source = e
      .target
      .src
      .substring(e.target.src.lastIndexOf('/') + 1);

    window.location.href = `/update-image?title=${f}&ptr=${ptr}&img=${i}&src=${source}`
  }),
  $('.btn-select').on('click', (e) => {
    const image = e.target.value;
    const title = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    const element = $('#element')[0].innerText
    const caller = $('#caller')[0].innerText;
    const scene = $('#scene')[0].innerText;
   window.location.href = `/update-image-display?title=${title}&ptr=${ptr}&scene=${scene}&element=${element}&image=${image}&caller=${caller}`
  }),
  $('#btn-back').on('click', () => {
    const title = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    if (caller == 'display'){
      window.location.href = `/update-image-display?title=${title}&ptr=${ptr}`
      } else {
        window.location.href = `/scenes?title=${title}&ptr=${ptr}`
      }
  })