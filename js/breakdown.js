$(window).on('load', function () {
  $('#nav-breakdown').addClass('active');
  let hidden = $('#hidden')[0].innerText;
  hidden = hidden.split(',');
  let categories = $('#categories')[0].innerText;
  categories = categories.split(',');
  categories.forEach((e, index) => {
    let table = `table-${e}`;
    let control = `btn-control-${e}`;
    table = table.replace(/ /gi, '-');
    control = control.replace(/ /gi, '-');
    if (hidden[0].substring(index, index + 1) === 'h') {
      $(`#${table}`).hide();
      $(`#${control}`).show();
    };
  });

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

const listHidden = () => {
  let h = '';
  let categories = $('#categories')[0].innerText;
  categories = categories.split(',');
  categories.forEach((e) => {
    let table = `table-${e}`;
    table = table.replace(/ /gi, '-');
    if ($(`#${table}`).is(':hidden')) {
      h = h + 'h';
    } else {
      h = h + 'r';
    }
  });
  return h;
};

$('.btn-control').on('click', (e) => {
  let table = `table-${e.target.value}`;
  let control = `btn-control-${e.target.value}`;
  table = table.replace(/ /gi, '-');
  control = control.replace(/ /gi, '-');
  $(`#${table}`).show();
  $(`#${control}`).hide();
});

$('.btn-hide').on('click', (e) => {
  let table = `table-${e.target.value}`;
  let control = `btn-control-${e.target.value}`;
  table = table.replace(/ /gi, '-');
  control = control.replace(/ /gi, '-');
  $(`#${table}`).hide();
  $(`#${control}`).show();
});

$('#btn-hide-all').on('click', () => {
  let categories = $('#categories')[0].innerText;
  categories = categories.split(',');
  categories.forEach((e) => {
    let table = `table-${e}`;
    let control = `btn-control-${e}`;
    table = table.replace(/ /gi, '-');
    control = control.replace(/ /gi, '-');
    $(`#${table}`).hide();
    $(`#${control}`).show();
  });
});

$('#btn-reveal-all').on('click', () => {
  let categories = $('#categories')[0].innerText;
  categories = categories.split(',');
  categories.forEach((e) => {
    let table = `table-${e}`;
    let control = `btn-control-${e}`;
    table = table.replace(/ /gi, '-');
    control = control.replace(/ /gi, '-');
    $(`#${table}`).show();
    $(`#${control}`).hide();
  });
});

$('.btn-del').on('click', (e) => {
  const hidden = listHidden();
  const element = e.target.id.substring(4);
  const entity = e.target.value;
  const url = buildUrl('breakdown', '', '');
  window.location.href = `${url}&element=${element}&entity=${entity}&action=del&hidden=${hidden}`;
});

$('.btn-element').on('click', (e) => {
  if (window.getSelection().anchorNode) {
    const element = e.target.value;
    const snippet = window.getSelection().anchorNode.data;
    let start = window.getSelection().anchorOffset;
    let finish = window.getSelection().focusOffset;
    if (start > finish) {
      const temp = start;
      start = finish;
      finish = temp;
    };
    const entity = snippet.substring(start, finish).trim().toUpperCase();
    const hidden = listHidden();
    let url = buildUrl('breakdown', '', '');
    url += `&element=${element}&entity=${entity}&action=add&hidden=${hidden}`;
    window.location.href = url;
  }
});

$('#btn-previous-scene').on('click', () => {
  const sceneNumber = parseInt($('#sceneNumber')[0].innerText) - 1;
  const hidden = listHidden();
  const url = buildUrl('breakdown', sceneNumber, '');
  window.location.href = `${url}&hidden=${hidden}`;
});

$('#btn-next-scene').on('click', () => {
  const sceneNumber = parseInt($('#sceneNumber')[0].innerText) + 1;
  const hidden = listHidden();
  const url = buildUrl('breakdown', sceneNumber, '');
  window.location.href = `${url}&hidden=${hidden}`;
});

$('#btn-last-scene').on('click', () => {
  const sceneNumber = $('#highestScene')[0].innerText;
  const hidden = listHidden();
  const url = buildUrl('breakdown', sceneNumber, '');
  window.location.href = `${url}&hidden=${hidden}`;
});

$('#btn-first-scene').on('click', () => {
  const url = buildUrl('breakdown', 1, '');
  const hidden = listHidden();
  window.location.href = `${url}&hidden=${hidden}`;
});

$('#btn-report').on('click', () => {
  const url = buildUrl('breakdown-report', '', '');
  window.location.href = url;
});
