const updatePage = (current) => {
  const size = parseInt($("#size")[0].innerText);
  if (current > size) {
    current = size;
  }
  if (current < 0) {
    current = 0;
  }
  const title = $("#title")[0].innerText;
  const card = $(`#card${current}`)[0].innerText;
  const sound = $(`#sound${current}`)[0].innerText;
  const start = $(`#start${current}`)[0].innerText;
  const finish = $(`#finish${current}`)[0].innerText;
  const character = $(`#character${current}`)[0].innerText;
  const dialogue = $(`#dialogue${current}`)[0].innerText;
  const slug = $(`#slug${current}`)[0].innerText;
  const imageType = $(`#imageType${current}`)[0].innerText;

  $("#current")[0].innerText = current;
  $("#start")[0].innerText = start;
  $("#finish")[0].innerText = finish;
  $("#character")[0].innerText = character;
  $("#dialogue")[0].innerText = dialogue;
  $("#slug")[0].innerText = slug;

  if (imageType === "movie") {
    document.getElementById("viddy").src = `../data/${title}/images/${card}`;
  } else {
    document.getElementById("piccy").src = `../data/${title}/images/${card}`;
  }

  const s = `../data/${title}/sounds/${sound}`;
  document.getElementById("master-play").setAttribute("src", s);
  document.getElementById("master-play").play();
};

$("#btn-back").on("click", () => {
  const title = $("#title")[0].innerText;
  const sceneNumber = $("#sceneNumber")[0].innerText;
  window.location.href = `/display?title=${title}&sceneNumber=${sceneNumber}`;
}),
  $("#btn-next").on("click", () => {
    let current = $("#current")[0].innerText;
    current++;
    updatePage(current);
  }),
  $("#btn-previous").on("click", () => {
    let current = $("#current")[0].innerText;
    current--;
    updatePage(current);
  }),
  $("html").keydown(function (e) {
    if (e.keyCode === 37) {
      let current = $("#current")[0].innerText;
      current--;
      updatePage(current);
    }
    if (e.keyCode === 39) {
      let current = $("#current")[0].innerText;
      current++;
      updatePage(current);
    }
  });
