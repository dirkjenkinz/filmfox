$(window).on('load', function () {
  $('#nav-categories').addClass('active');
});

const buildUrl = (call, sceneNumber, elementNumber) => {
  const title = $('#filmTitle')[0].innerText;
  if (sceneNumber === '') {
    sceneNumber = $('#sceneNumber')[0].innerText;
  }
  if (elementNumber === '') {
    elementNumber = $('#elementNumber')[0].innerText;
  }
  return `/${call}?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
};

$('.btn-delete-category').on('click', (e) => {
  const category = e.target.value;
  const url = buildUrl('delete-category', '', '');
  window.location.href = `${url}&element=${element}&category=${category}`;
});

$('#btn-add-category').on('click', () => {
  const category = $('#input-category')[0].value;
  if (category !== '') {
    const url = buildUrl('add-category', '', '');
    window.location.href = `${url}&category=${category}`;
  };
});
