$('#btn-back').on('click', () => {
    const title = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    window.location.href = `/display?title=${title}&ptr=${ptr}`;
  }),
  $('.btn-merge').on('click', (e) => {
    let scene = e.target.value;
    const title = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    window.location.href = `/concat?title=${title}&scene=${scene}&ptr=${ptr}`;
  }),
  $('.btn-play').on('click', (e) => {
    const title = $('#title')[0].innerText;
    let num = '000000' + e.target.value;
    num = num.substring(num.length - 5);
    element = `s${num}.mp3`;
    s = '../data/' + title + '/scenes/' + element;
    $('#selected')[0].innerText = element;
    document
      .getElementById("master-play")
      .setAttribute('src', s);
    document
      .getElementById("master-play")
      .play();
  }),
  $('#btn-enable').on('click', (e) => {
    const l = $('#size')[0].innerText;
    if ($('#btn-enable')[0].innerText === 'Enable DELETE') {
      $('#btn-enable')[0].innerText = 'Disable DELETE';
      for (let i = 0; i < l; i++) {
        $(`#btn-delete_${i}`).attr("disabled", false)
      }
    } else {
      $('#btn-enable')[0].innerText = 'Enable DELETE';
      for (let i = 0; i < l; i++) {
        $(`#btn-delete_${i}`).attr("disabled", true)
      }
    }
  }),
  $('.btn-delete').on('click', (e) => {
    const title = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    let num = '000000' + e.target.value;
    num = num.substring(num.length - 5);
    element = `s${num}.mp3`;
    window.location.href = `/delete?title=${title}&element=${element}&ptr=${ptr}&sub=scenes`;
  }),
  $('#btn-master').on('click', (e) => {
    const title = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    const size = $('#size')[0].innerText;
    window.location.href = `/master?title=${title}&ptr=${ptr}&size=${size}`;
  }),
  $('#btn-play-master').on('click', (e) => {
    const title = $('#title')[0].innerText;
    s = '../data/' + title + '/scenes/master.mp3';
    $('#selected')[0].innerText = 'Master Sound File';
    document
      .getElementById("master-play")
      .setAttribute('src', s)
    document
      .getElementById("master-play")
      .play();
  })