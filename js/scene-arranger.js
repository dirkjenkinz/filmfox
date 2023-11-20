$(window).on('load', function () {
  $('#table1')[0].scrollTop = $('#scr1')[0].innerText;
});

$('.btn-down').on('click', (e) => {
  const size = $('#size')[0].innerText;
  const num = e.target.value;
  const title = $('#filmTitle')[0].innerText;
  const elementNumber = $('#elementNumber')[0].innerText;
  const sceneNumber = $('#sceneNumber')[0].innerText;
  const scr1 = $('#table1')[0].scrollTop;
  window.location.href = `/change-scene-order?title=${title}&scr1=${scr1}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}&direction=down&num=${num}`;
});

$('.btn-up').on('click', (e) => {
  const size = $('#size')[0].innerText;
  const num = e.target.value;
  const title = $('#filmTitle')[0].innerText;
  const elementNumber = $('#elementNumber')[0].innerText;
  const sceneNumber = $('#sceneNumber')[0].innerText;
  const scr1 = $('#table1')[0].scrollTop;
  window.location.href = `/change-scene-order?title=${title}&scr1=${scr1}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}&direction=up&num=${num}`;
});
