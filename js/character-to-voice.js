$(() => {
  $('#nav-ctv').addClass('active');
  $('#table1')[0].scrollTop = $('#scr1')[0].innerText;
});

$('select').on('change', function () {
  const num = this.name.substring(7);
  const id = this.id;
  const cid = `char_${num}`;
  const voice = $(`#${id} option:selected`).text().trim();
  const character = $(`#${cid}`)[0].textContent;
  const title = $('#filmTitle')[0].outerText;
  const sceneNumber = $('#sceneNumber')[0].innerText;
  const elementNumber = $('#elementNumber')[0].innerText;
  const scr1 = $('#table1')[0].scrollTop;

  window.location.href = `/character-update?title=${title}&character=${character}&voice=${voice}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}&scr1=${scr1}`;
});

$('.btn-action').on('click', function (e) {
  if ($(this).hasClass('btn-play-sample')) {
    const id = e.target.value;
    const title = $('#filmTitle')[0].innerText;
    const s = `../data/samples/${id}.mp3`;

    document.getElementById('master-play').setAttribute('src', s);
    document.getElementById('master-play').play();
  } else if ($(this).hasClass('btn-delete-category')) {
    const category = e.target.value;
    const url = buildUrl('delete-category', '', '');
    window.location.href = `${url}&element=${element}&category=${category}`;
  } else if ($(this).hasClass('btn-add-category')) {
    const category = $('#input-category')[0].value;
    if (category !== '') {
      const url = buildUrl('add-category', '', '');
      window.location.href = `${url}&category=${category}`;
    }
  } else if ($(this).hasClass('btn-display-category')) {
    const category = e.target.value;
    const url = buildUrl('categories', '', '');
    window.location.href = `${url}&category=${category}`;
  } else if ($(this).hasClass('btn-display-all')) {
    const category = '';
    const url = buildUrl('categories', '', '');
    window.location.href = `${url}&category=${category}`;
  }
});
