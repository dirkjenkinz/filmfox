$(() => {
    const e = $('#sceneNumber')[0].innerText;
    const element = `row_${e}`;
    const elm = document.getElementById(element);
    elm.scrollIntoView(true);
  }),
  $('#front').on('click', () => {
    window.location.href = `/`
  }),
  $('#ctv').on('click', () => {
    const f = $('#title')[0].innerText
    let sceneNumber = $('#sceneNumber')[0].innerText
    window.location.href = `/ctv?filmFoxFile=${f}&sceneNumber=${sceneNumber}`
  }),
  $('.btn-gen').on('click', (e) => {
    const file = e.target.value;
    const title = $('#title')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    window.location.href = `/generate-single?title=${title}&file=${file}&sceneNumber=${sceneNumber}`
  }),
  $('.btn-play').on('click', (e) => {
    const title = $('#title')[0].innerText;
    const s = `../data/${title}/sounds/${e.target.value}`;
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
    const sceneNumber = $('#sceneNumber')[0].innerText;
    const element = `${e.target.value}`;
    window.location.href = `/delete?title=${title}&element=${element}&sceneNumber=${sceneNumber}&sub=sounds&num=${num}`;
  }),
  $('#btn-build-showreel').on('click', () => {
    const f = $('#title')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    window.location.href = `/build-showreel?title=${f}&sceneNumber=${sceneNumber}`;
  }),
  $('#btn-merge').on('click', () => {
    const f = $('#title')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    window.location.href = `/merge?title=${f}&sceneNumber=${sceneNumber}`;
  }),
  $('#btn-scenes').on('click', () => {
    const title = $('#title')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    window.location.href = `/scenes?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $('#btn-next-scene').on('click', () => {
    const title = $('#title')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    const scNum = $('#nextScene')[0].innerText;
    window.location.href = `/display?title=${title}&sceneNumber=${scNum}&sceneNumber=${sceneNumber}&locked='yes`;
  }),
  $('#btn-previous-scene').on('click', () => {
    const title = $('#title')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    const scNum = $('#sceneNumber')[0].innerText - 1;
    window.location.href = `/display?title=${title}&sceneNumber=${scNum}&sceneNumber=${sceneNumber}&locked='yes`;
  }),
  $('.btn-change').on('click', (e) => {
    const title = $('#title')[0].innerText;
    let scNum =  $('#sceneNumber')[0].innerText;
    const element = e.target.value;
    window.location.href = `/gallery?title=${title}&sceneNumber=${scNum}&element=${element}&caller=display`
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
  $('#btn-video').on('click', () => {
    const title = $('#title')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    window.location.href = `/video?title=${title}&sceneNumber=${sceneNumber}`;
  })