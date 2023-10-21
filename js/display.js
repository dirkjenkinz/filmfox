$(() => {
  $("#nav-display").addClass("active");
}),
  $(".btn-gen").on("click", (e) => {
    const elementNumber = e.target.value;
    voice = $(`#voice_${elementNumber}`)[0].innerText;
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/generate-single?title=${title}&elementNumber=${elementNumber}&voice=${voice}&caller=display`;
  }),
  $(".btn-scene-shot-list").on("click", (e) => {
    const title = $("#filmTitle")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/scene-shot-list?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $(".btn-play").on("click", (e) => {
    const title = $("#filmTitle")[0].innerText;
    const s = `../data/${title}/sounds/${e.target.value}`;
    document.getElementById("master-play").setAttribute("src", s);
    document.getElementById("master-play").play();
  }),
  $(".btn-del").on("click", (e) => {
    if (confirm("Are you sure you want to delete this sound file?")) {
      const num = e.target.id.substring(4);
      const title = $("#filmTitle")[0].innerText;
      const sceneNumber = $("#sceneNumber")[0].innerText;
      const element = `${e.target.value}`;
      window.location.href = `/delete?title=${title}&element=${element}&sceneNumber=${sceneNumber}&sub=sounds&num=${num}`;
    }
  }),
  $("#btn-next").on("click", (e) => {
    const title = $("#filmTitle")[0].innerText;
    sceneNumber = parseInt(e.target.value) + 1;
    window.location.href = `/display?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $("#btn-previous").on("click", (e) => {
    const title = $("#filmTitle")[0].innerText;
    sceneNumber = parseInt(e.target.value) - 1;
    window.location.href = `/display?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $(".btn-change").on("click", (e) => {
    const title = $("#filmTitle")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    const element = e.target.value;
    window.location.href = `/gallery?title=${title}&sceneNumber=${sceneNumber}&element=${element}&caller=display`;
  }),
  $("#btn-add-character").on("click", () => {
    if (($("#btn-add-character")[0].innerText === "Add Character")) {
      $("#table-characters").show();
      $("#btn-add-character")[0].innerText = "CANCEL";
    } else {
      $("#table-characters").hide();
      $("#btn-add-character")[0].innerText = "Add Character";
    }
  }),
  $("#btn-delete-character").on("click", () => {
    if (($("#btn-delete-character")[0].innerText === "Delete Character")) {
      $("#table-characters-in-scene").show();
      $("#btn-delete-character")[0].innerText = "CANCEL";
    } else {
      $("#table-characters-in-scene").hide();
      $("#btn-delete-character")[0].innerText = "Delete Character";
    }
  }),
  $(".btn-add-char").on("click", (e) => {
    const character = e.target.value;
    const title = $("#filmTitle")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/add-character-to-scene?title=${title}&sceneNumber=${sceneNumber}&character=${character}`;
  }),
  $(".btn-delete-char").on("click", (e) => {
    const character = e.target.value;
    const title = $("#filmTitle")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/delete-character-from-scene?title=${title}&sceneNumber=${sceneNumber}&character=${character}`;
  }),
  $("#input-note").on("focusout", (e) => {
    const val = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    const sceneNumber = $("#sceneNumber")[0].outerText;
    window.location.href = `/update-note?title=${title}&sceneNumber=${sceneNumber}&val=${val}`;
  });
