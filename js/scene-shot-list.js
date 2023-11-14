$(() => {
  $('#nav-scene-shot-list').addClass('active');
});

const buildUrl = (call, sceneNumber, elementNumber) => {
  const title = $('#filmTitle')[0].innerText;
  if (sceneNumber === ''){
    sceneNumber = $('#sceneNumber')[0].innerText;
  };
  if (elementNumber === ''){
    elementNumber = $('#elementNumber')[0].innerText;
  };
  return `/${call}?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
};

$('#slider-scene').on('input', (e) => {
  $('#output')[0].innerText = e.target.value;
});

$('#slider-scene').on('change', (e) => {
  const sceneNumber = e.target.value;
  const url = buildUrl('scene-shot-list', sceneNumber, '');
  window.location.href = url;
});

$('.shot-select').on('change', (e) => {
  const line = e.target.id;
  const val = e.target.value;
  let l1 = line.substring(5).split('_');
  const url = buildUrl('update-shot-list', '', '');
  window.location.href = `${url}&val=${val}&item=${l1[0]}&line=${l1[1]}`;
});

  $('.shot-subject').on('focusout', (e) => {
  const line = e.target.id.substring(13);
  const val = e.target.value;
  const url = buildUrl('update-shot-list', '', '');
  window.location.href = `${url}&val=${val}&item=subject&line=${line}`;
  });

  $('.shot-description').on('change', (e) => {
    const line = e.target.id.substring(17);
    const val = e.target.value;
    const url = buildUrl('update-shot-list', '', '');
    window.location.href = `${url}&val=${val}&item=description&line=${line}`;
   });

   $('.btn-next').on('click', (e) => {
    const title = $('#filmTitle')[0].outerText;
    const sceneNumber = parseInt($('#sceneNumber')[0].outerText) + 1;
    window.location.href = `/scene-shot-list?title=${title}&sceneNumber=${sceneNumber}&elementNumber=0;`;
   });

   $('.btn-previous').on('click', (e) => {
    const title = $('#filmTitle')[0].outerText;
    const sceneNumber = parseInt($('#sceneNumber')[0].outerText) - 1;
    window.location.href = `/scene-shot-list?title=${title}&sceneNumber=${sceneNumber}&elementNumber=0;`;
   });

   $('.btn-add').on('click', (e) => {
    const line = e.target.value;
    const title = $('#filmTitle')[0].outerText;
    const sceneNumber = $('#sceneNumber')[0].outerText;
    window.location.href = `/add-shot?title=${title}&sceneNumber=${sceneNumber}&elementNumber=0&line=${line}`;
   });

   $('.btn-delete').on('click', (e) => {
    const line = e.target.value;
    const title = $('#filmTitle')[0].outerText;
    const sceneNumber = $('#sceneNumber')[0].outerText;
    window.location.href = `/delete-shot?title=${title}&sceneNumber=${sceneNumber}&elementNumber=0&line=${line}`;
   });

   $('#input-note').on('focusout', (e) => {
    const val = e.target.value;
    const title = $('#filmTitle')[0].outerText;
    const sceneNumber = $('#sceneNumber')[0].outerText;
    window.location.href = `/update-note?title=${title}&sceneNumber=${sceneNumber}&elementNumber=0&val=${val}&caller=shot-list`;
  });
