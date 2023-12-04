$(() => {
  $('#nav-video').addClass('active');
});

$('.btn-generate').on('click', (e) => {
  const title = $('#filmTitle')[0].innerText;
  const sceneNumber = e.target.value;
  window.location.href = `/create-video?title=${title}&sceneNumber=${sceneNumber}`;
});

$('.btn-modify').on('click', (e) => {
  const title = $('#filmTitle')[0].innerText;
  const sceneNumber = e.target.value;
  window.location.href = `/create-video?title=${title}&sceneNumber=${sceneNumber}`;
});  