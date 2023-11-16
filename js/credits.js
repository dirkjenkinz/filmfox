$(() => {
  $('#nav-credits').addClass('active');
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

$('#input-writer').on('focusout', (e) => {
  const val = e.target.value;
  const url = buildUrl('update-credits', '', '');
  window.location.href = `${url}&credit=writer&val=${val}`;
});

$('#input-director').on('focusout', (e) => {
  const val = e.target.value;
  const url = buildUrl('update-credits', '', '');
  window.location.href = `${url}&credit=director&val=${val}`;
});

$('#input-producer').on('focusout', (e) => {
  const val = e.target.value;
  const url = buildUrl('update-credits', '', '');
  window.location.href = `${url}&credit=producer&val=${val}`;
});

$('#input-title').on('focusout', (e) => {
  const val = e.target.value;
  const url = buildUrl('update-credits', '', '');
  window.location.href = `${url}&credit=title&val=${val}`;
});
