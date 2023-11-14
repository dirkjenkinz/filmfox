$('#btn-hide-and-show').on('click', () => {
  const length = $('#size')[0].innerText;
  if ($('#btn-hide-and-show')[0].innerText === 'Hide All') {
    for (let num = 0; num < length; num++) {
      $(`#table-shots-list-${num}`).hide();
    }
    $('#btn-hide-and-show')[0].innerText = 'Show All';
  } else {
    for (let num = 0; num < length; num++) {
      $(`#table-shots-list-${num}`).show();
    }
    $('#btn-hide-and-show')[0].innerText = 'Hide All';
  }
});

$('.btn-scene').on('click', (e) => {
  const sceneNumber = e.target.value;
  const elementNumber = $('#elementNumber')[0].innerText;
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/scene-shot-list?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
});

$('#slider-scene').on('input', (e) => {
  $('#output')[0].innerText = `${e.target.value}`;
});

$('#slider-scene').on('change', (e) => {
  const top = e.target.value;
  const title = $('#filmTitle')[0].innerText;
  const elementNumber = $('#elementNumber')[0].innerText;
  const sceneNumber = $('#sceneNumber')[0].innerText;
  window.location.href = `/scene-arranger?top=${top}&title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}`;
});
