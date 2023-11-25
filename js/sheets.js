$(() => {
  $('#nav-sheets').addClass('active');
});

$('#slider-scene').on('input', (e) => {
  $('#output')[0].innerText = e.target.value;
});

$('#slider-scene').on('change', (e) => {
  const sheetNumber = e.target.value;
  const title = $('#filmTitle')[0].innerText;
  const sceneNumber = $('#sceneNumber')[0].innerText;
  const elementNumber = $('#elementNumber')[0].innerText;
  window.location.href = `/sheets?title=${title}&sheet=${sheetNumber}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
});

$('#btn-previous').on('click', (e) => {
  let sheet = parseInt($('#sheet')[0].innerText);
  sheet--;
  const title = $('#filmTitle')[0].innerText;
  const sceneNumber = $('#sceneNumber')[0].innerText;
  const elementNumber = $('#elementNumber')[0].innerText;
  window.location.href = `/sheets?title=${title}&sheet=${sheet}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
});

  $('#btn-next').on('click', (e) => {
    let sheet = parseInt($('#sheet')[0].innerText);
    sheet++;
    const title = $('#filmTitle')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    const elementNumber = $('#elementNumber')[0].innerText;
    window.location.href = `/sheets?title=${title}&sheet=${sheet}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
  });

  $('#btn-pdf').on('click', (e) => {
    let sheet = parseInt($('#sheet')[0].innerText);
    let scene = $('#sceneNum')[0].innerText;
    sceneNumber = scene.substring(6);
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/pdf?title=${title}&sheetNumber=${sheet}&sceneNumber=${sceneNumber}`;
  });
