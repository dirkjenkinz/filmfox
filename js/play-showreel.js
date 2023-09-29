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
    window.location.href = `/play-showreel?title=${title}&current=${current}`;
  }),
  $("#btn-previous").on("click", () => {
    let current = $("#current")[0].innerText;
    current--;
    const title = $("#title")[0].innerText;
    window.location.href = `/play-showreel?title=${title}&current=${current}`;
  }),
  $("html").keydown(function (e) {
    if (e.keyCode === 37) {
      let current = $("#current")[0].innerText;
      current--;
      const title = $("#title")[0].innerText;
      window.location.href = `/play-showreel?title=${title}&current=${current}`;
    }
    if (e.keyCode === 39) {
      let current = $("#current")[0].innerText;
      current++;
      const title = $("#title")[0].innerText;
      window.location.href = `/play-showreel?title=${title}&current=${current}`;
    }
  });
