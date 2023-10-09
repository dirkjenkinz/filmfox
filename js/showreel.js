$(() => {
  $("#btn-build-showreel").attr("disabled", true)
}),
$(() => {
  const s = $("#audio")[0].innerText;
  document.getElementById("master-play").setAttribute("src", s);
  document.getElementById("master-play").play();
}),
  $("#btn-next-element").on("click", () => {
    if ($('#elementNumber')[0].innerText < $('#highestElement')[0].innerText) {
    const elementNumber = parseInt($('#elementNumber')[0].innerText) + 1;
    const mute = $('#btn-mute')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&mute=${mute}`;
    } else {
      $('#btn-next-scene').trigger('click');
    }
  }),
  $("#btn-next-scene").on("click", () => {
    const elementNumber = 0;
    const mute = $('#btn-mute')[0].innerText;
    const sceneNumber = parseInt($('#sceneNumber')[0].innerText) + 1;
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&mute=${mute}`;
  }),
  $("#btn-previous-scene").on("click", () => {
    const elementNumber = 0;
    const mute = $('#btn-mute')[0].innerText;
    const sceneNumber = parseInt($('#sceneNumber')[0].innerText) - 1;
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&mute=${mute}`;
  }),
  $("#btn-previous-element").on("click", () => {
    const mute = $('#btn-mute')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    const elementNumber = parseInt($('#elementNumber')[0].innerText) - 1;
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&mute=${mute}`;
  }),
  $("#btn-mute").on("click",  () => {
    if ($('#btn-mute')[0].innerText === 'MUTE') {
      $('#btn-mute')[0].innerText = 'UNMUTE';
      $('audio').prop("muted", true);
    } else {
      $('#btn-mute')[0].innerText = 'MUTE';
      $('audio').prop("muted", false);
    }
  }),
  $("html").keydown(function (e) {
    if (e.keyCode === 37) {
      let current = $("#current")[0].innerText;
      current--;
      const title = $("#filmTitle")[0].innerText;
      const mute = $('#btn-mute')[0].innerText;
      window.location.href = `/showreel?title=${title}&current=${current}&mute=${mute}`;
    }
    if (e.keyCode === 39) {
      let current = $("#current")[0].innerText;
      current++;
      const title = $("#filmTitle")[0].innerText;
      const mute = $('#btn-mute')[0].innerText;
      window.location.href = `/showreel?title=${title}&current=${current}&mute=${mute}`;
    }
  });
