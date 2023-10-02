$(() => {
  $("#btn-build-showreel").attr("disabled", true)
}),
$(() => {
  const s = $("#sound")[0].innerText;
  document.getElementById("master-play").setAttribute("src", s);
  document.getElementById("master-play").play();
}),
  $("#btn-back").on("click", () => {
    const title = $("#title")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/display?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $("#btn-next").on("click", () => {
    let current = $("#current")[0].innerText;
    current++;
    const title = $("#title")[0].innerText;
    const mute = $('#btn-mute')[0].innerText
    window.location.href = `/play-showreel?title=${title}&current=${current}&mute=${mute}&action=null`;
  }),
  $("#btn-next-scene").on("click", () => {
    let current = $("#current")[0].innerText;
    const title = $("#title")[0].innerText;
    const mute = $('#btn-mute')[0].innerText
    window.location.href = `/play-showreel?title=${title}&current=${current}&action=nextScene&mute=${mute}`;
  }),
  $("#btn-previous-scene").on("click", () => {
    let current = $("#current")[0].innerText;
    const title = $("#title")[0].innerText;
    const mute = $('#btn-mute')[0].innerText
    window.location.href = `/play-showreel?title=${title}&current=${current}&action=previousScene&mute=${mute}`;
  }),
  $("#btn-previous").on("click", () => {
    let current = $("#current")[0].innerText;
    current--;
    const title = $("#title")[0].innerText;
    const mute = $('#btn-mute')[0].innerText
    window.location.href = `/play-showreel?title=${title}&current=${current}&mute=${mute}&action=null`;
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
      const title = $("#title")[0].innerText;
      const mute = $('#btn-mute')[0].innerText;
      window.location.href = `/play-showreel?title=${title}&current=${current}&mute=${mute}`;
    }
    if (e.keyCode === 39) {
      let current = $("#current")[0].innerText;
      current++;
      const title = $("#title")[0].innerText;
      const mute = $('#btn-mute')[0].innerText;
      window.location.href = `/play-showreel?title=${title}&current=${current}&mute=${mute}`;
    }
  });
