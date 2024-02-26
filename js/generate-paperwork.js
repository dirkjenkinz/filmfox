$(document).ready(() => {
  // Add 'active' class to the 'nav-report' element
  $('#nav-generate-paperwork').addClass('active');
});

$('#btn-category-pdfs').on('click', (e) => {
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/generate-category-pdfs?title=${title}`;
});

$('#btn-category-csvs').on('click', (e) => {
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/generate-category-csvs?title=${title}`;
});

$('#btn-sheet-pdfs').on('click', (e) => {
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/generate-sheet-pdfs?title=${title}`;
});

$('#btn-sheet-csvs').on('click', (e) => {
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/generate-sheet-csvs?title=${title}`;
});

$('#btn-powerpoint').on('click', (e) => {
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/generate-powerpoint?title=${title}`;
});

$('#btn-shot-pdfs').on('click', (e) => {
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/generate-shot-pdfs?title=${title}`;
});

$('#btn-shot-csvs').on('click', (e) => {
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/generate-shot-csvs?title=${title}`;
});