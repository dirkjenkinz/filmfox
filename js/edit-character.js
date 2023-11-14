$('.btn-play').on('click', (e) => {
  const title = $('#filmTitle')[0].innerText;
  element = e.target.value;
  s = '../data/' + title + '/sounds/' + element;
  document.getElementById('master-play').setAttribute('src', s);
  document.getElementById('master-play').play();
});

$('.btn-gen').on('click', (e) => {
  const file = e.target.value.split('_');
  const title = $('#filmTitle')[0].innerText;
  const voice = $('#current-voice')[0].innerText;
  const character = $('#character')[0].innerText;
  window.location.href = `/generate-single?title=${title}&sceneNumber=${file[0]}&elementNumber=${file[1]}&voice=${voice}&caller=edit-character&character=${character}`;
});
