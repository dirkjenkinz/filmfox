$(() => {
  $('#nav-ctv').addClass('active');
  $('#table1')[0].scrollTop = $('#scr1')[0].innerText;
});

  $('select').on('change', function (e) {
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

  $('.btn-play-sample').on('click', (e) =>{
    const id = e.target.value;
    const title = $('#filmTitle')[0].innerText;
    const s = `../data/samples/${id}.mp3`;
    document.getElementById('master-play').setAttribute('src', s);
    document.getElementById('master-play').play();
  });
