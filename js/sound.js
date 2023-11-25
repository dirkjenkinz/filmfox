$(() => {
  $('#nav-sound').addClass('active');
});

$('.btn-merge').on('click', (e) => {
  let sceneNumber = e.target.value;
  const title = $('#filmTitle')[0].innerText;
  const elementNumber = $('#elementNumber')[0].innerText;
  window.location.href = `/concat?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
});

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
});

$('.btn-compile').on('click', (e) => {
  const id = e.target.id;
  const elements = e.target.value.split(',');
  const voice=elements[3];
  const character = elements[2];
  const sceneNumber = elements[0];
  const elementNumber = elements[1];
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/generate-single?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&voice=${voice}&caller=sound&character=${character}`;
});

$('#btn-master').on('click', () => {
  const title = $('#filmTitle')[0].innerText;
  const sceneNumber = $('#sceneNumber')[0].innerText;
  const elementNumber = $('#elementNumber')[0].innerText;
  const size = $('#size')[0].innerText;
  window.location.href = `/master?title=${title}&sceneNumber=${sceneNumber}&size=${size}&elementNumber=${elementNumber}`;
});

$('#btn-show-uncompiled').on('click', () => {
  if ($('#btn-show-uncompiled')[0].innerText === 'Show Uncompiled Elements'){
  $('#col-uncompiled').show();
  $('#col-scenes').hide();
  $('#btn-show-uncompiled')[0].innerText = 'Return to Scenes';
  } else {
    $('#col-uncompiled').hide();
    $('#col-scenes').show();
    $('#btn-show-uncompiled')[0].innerText = 'Show Uncompiled Elements';
  };
});

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