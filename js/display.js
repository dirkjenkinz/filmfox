$(() => {
    const e = $('#ptr')[0].innerText;
    const element = `row_${e}`;
    const elm = document.getElementById(element);
    elm.scrollIntoView(true);
  }),
  $('#front').on('click', () => {
    window.location.href = `/`
  }),
  $('#ctv').on('click', () => {
    const f = $('#title')[0].innerText
    let ptr = $('#ptr')[0].innerText
    window.location.href = `/ctv?filmFoxFile=${f}&ptr=${ptr}`
  }),
  $('.btn-gen').on('click', (e) => {
    const num = e
      .target
      .id
      .substring(4)
    let title = $('#title')[0].innerText
    const ptr = $('#ptr')[0].innerText
    window.location.href = `/generate-single?title=${title}&element=${num}&ptr=${ptr}`
  }),
  $('.btn-play').on('click', (e) => {
    const title = $('#title')[0].innerText;
    const s = `../data/${title}/sounds/${e.target.value}.mp3`;
    document
      .getElementById("master-play")
      .setAttribute('src', s);
    document
      .getElementById("master-play")
      .play();
  }),
  $('.btn-del').on('click', (e) => {
    const num = e
      .target
      .id
      .substring(4);
    const title = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    const element = `${e.target.value}.mp3`;
    window.location.href = `/delete?title=${title}&element=${element}&ptr=${ptr}&sub=sounds&num=${num}`;
  }),
  $('#btn-srt').on('click', () => {
    const f = $('#title')[0].innerText
    let ptr = $('#ptr')[0].innerText
    window.location.href = `/srt?title=${f}&ptr=${ptr}`
  }),
  $('#btn-build-showreel').on('click', () => {
    const f = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    window.location.href = `/build-showreel?title=${f}&ptr=${ptr}`;
  }),
  $('#btn-merge').on('click', () => {
    const f = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    window.location.href = `/merge?title=${f}&ptr=${ptr}`;
  }),
  $('.btn-change').on('click', (e) => {
    const title = $('#title')[0].innerText;
    let ptr = e
      .target
      .id
      .substring(7);
    ptr--;
    if (ptr < 0) 
      ptr = 0;
    const element = e.target.value;
    window.location.href = `/gallery?title=${title}&ptr=${ptr}&element=${element}`
  }),
  $('#btn-sound-lock').on('click', () => {
    const l = $('#length')[0].innerText;
    if ($('#btn-sound-lock')[0].innerText === 'Lock Delete') {
      $('#btn-sound-lock')[0].innerText = 'Unlock Delete';
      for (let i = 0; i < l; i++) {
        $(`#del_${i}`).attr("disabled", true)
      }
    } else {
      $('#btn-sound-lock')[0].innerText = 'Lock Delete';
      for (let i = 0; i < l; i++) {
        $(`#del_${i}`).attr("disabled", false)
      }
    };
  }),
  $('#btn-go-to-element').on('click', () => {
    const e = $('#go-to-element')[0].value;
    const element = `row_${e}`;
    const elm = document.getElementById(element);
    elm.scrollIntoView(true);
  })