$(() => {
  $('#nav-sound').addClass('active');
}),
$('.btn-merge').on('click', (e) => {
    let sceneNumber = e.target.value;
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/concat?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $('.btn-play').on('click', (e) => {
    const title = $('#filmTitle')[0].innerText;
    let num = '000000' + e.target.value;
    num = num.substring(num.length - 5);
    element = `s${num}.mp3`;
    s = '../data/' + title + '/scenes/' + element;
    document
      .getElementById('master-play')
      .setAttribute('src', s);
    document
      .getElementById('master-play')
      .play();
  }),
  $('#btn-master').on('click', (e) => {
    const title = $('#filmTitle')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    const size = $('#size')[0].innerText;
    window.location.href = `/master?title=${title}&sceneNumber=${sceneNumber}&size=${size}`;
  }),
  $('#btn-play-master').on('click', (e) => {
    const title = $('#filmTitle')[0].innerText;
    s = '../data/' + title + '/scenes/master.mp3';
    document
      .getElementById('master-play')
      .setAttribute('src', s);
    document
      .getElementById('master-play')
      .play();
  });