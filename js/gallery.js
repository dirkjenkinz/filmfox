$('.imcg').on('click', (e) => {
    const f = $('#title')[0].innerText
    const scene = $('#scene')[0].innerText
    const i = $('#element')[0].innerText;
    const source = e
      .target
      .src
      .substring(e.target.src.lastIndexOf('/') + 1);
    window.location.href = `/update-image?title=${f}&scene=${scene}&img=${i}&src=${source}`
  }),
  $('.btn-select').on('click', (e) => {
    const image = e.target.value;
    const title = $('#title')[0].innerText;
    const element = $('#element')[0].innerText
    const caller = $('#caller')[0].innerText;
    const scene = $('#scene')[0].innerText;
    window.location.href = `/update-image-display?title=${title}&scene=${scene}&element=${element}&image=${image}&caller=${caller}`
  })