$(document).ready(() => {
  // Add 'active' class to the 'nav-report' element
  $('#nav-generate-paperwork').addClass('active');
});

$('#btn-category-pdfs').on('click', () => {
  const title = $('#filmTitle')[0].innerText;
  let sceneNumber = $('#sceneNumber').text();
  let elementNumber = $('#elementNumber').text();
  if (!sceneNumber) sceneNumber = 0;
  if (!elementNumber) elementNumber = 0;
  window.location.href = `/generate-category-pdfs?title=${title}`;
});

$('#btn-category-spreadsheets').on('click', () => {
  const title = $('#filmTitle')[0].innerText;
  let sceneNumber = $('#sceneNumber').text();
  let elementNumber = $('#elementNumber').text();
  if (!sceneNumber) sceneNumber = 0;
  if (!elementNumber) elementNumber = 0;
  window.location.href = `/generate-category-spreadsheets?title=${title}`;
});

$('#btn-sheet-pdfs').on('click', () => {
  let sceneNumber = $('#sceneNumber').text();
  let elementNumber = $('#elementNumber').text();
  if (!sceneNumber) sceneNumber = 0;
  if (!elementNumber) elementNumber = 0;
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/generate-sheet-pdfs?title=${title}`;
});

$('#btn-sheet-spreadsheets').on('click', () => {
  let sceneNumber = $('#sceneNumber').text();
  let elementNumber = $('#elementNumber').text();
  if (!sceneNumber) sceneNumber = 0;
  if (!elementNumber) elementNumber = 0;
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/generate-sheet-spreadsheets?title=${title}`;
});

$('#btn-powerpoint').on('click', () => {
  let sceneNumber = $('#sceneNumber').text();
  let elementNumber = $('#elementNumber').text();
  if (!sceneNumber) sceneNumber = 0;
  if (!elementNumber) elementNumber = 0;
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/create-powerpoint?title=${title}`;
});

$('#btn-shot-pdfs').on('click', (e) => {
  let sceneNumber = $('#sceneNumber').text();
  let elementNumber = $('#elementNumber').text();
  if (!sceneNumber) sceneNumber = 0;
  if (!elementNumber) elementNumber = 0;
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/generate-shot-pdfs?title=${title}`;
});

$('#btn-shot-spreadsheets').on('click', () => {
  let sceneNumber = $('#sceneNumber').text();
  let elementNumber = $('#elementNumber').text();
  if (!sceneNumber) sceneNumber = 0;
  if (!elementNumber) elementNumber = 0;
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/generate-shot-spreadsheets?title=${title}`;
});