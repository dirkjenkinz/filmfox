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
    const source = e.target.value;
    const title = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    const i = $('#element')[0].innerText;
    const h = $('#headersOnly')[0].innerText;
    window.location.href = `/update-image-display?title=${title}&ptr=${ptr}&img=${i}&src=${source}&headersOnly=${h}`
  }),
  $('#btn-back').on('click', () => {
    const title = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    window.location.href = `/display?title=${title}&ptr=${ptr}`;
  })