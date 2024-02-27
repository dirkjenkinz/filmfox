$(() => {
  $('#nav-video').addClass('active');
});

$('.btn-generate-elements').on('click', (e) => {
  const title = $('#filmTitle')[0].innerText;
  const sceneNumber = e.target.value;
  window.location.href = `/create-video?title=${title}&sceneNumber=${sceneNumber}`;
});

$('.btn-generate-scene').on('click', (e) => {
  const title = $('#filmTitle')[0].innerText;
  const sceneNumber = e.target.value;
  window.location.href = `/generate-scene?title=${title}&sceneNumber=${sceneNumber}`;
});

$('#btn-generate-all').on('click', () => {
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/generate-scene?title=${title}&sceneNumber=all`;
});

$('#btn-concatenate-video').on('click', (e) => {
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/concatenate-video?title=${title}`;
});

$('#btn-generate-powerpoint').on('click', (e) => {
  const title = $('#filmTitle')[0].innerText;
  const sceneNumber = $('#sceneNumber')[0].innerText;
  const elementNumber = $('#elementNumber')[0].innerText;
  window.location.href = `/generate-powerpoint?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
});
