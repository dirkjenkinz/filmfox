$(() => {
  $("#nav-showreel").addClass("active");
  const s = $("#audio")[0].innerText;
  if (s) {
    document.getElementById("master-play").setAttribute("src", s);
    document.getElementById("master-play").play();
  }
}),
  $("#slider-scene").on("input", (e) => {
    $("#output")[0].innerText = e.target.value;
  }),
  $("#slider-scene").on("change", (e) => {
    const elementNumber = 0;
    const mute = $("#btn-mute")[0].innerText;
    const sceneNumber = e.target.value;
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&mute=${mute}`;
  }),
  $("#btn-next-element").on("click", () => {
    if (
      parseInt($("#elementNumber")[0].innerText) <
      parseInt($("#highestElement")[0].innerText)
    ) {
      const elementNumber = parseInt($("#elementNumber")[0].innerText) + 1;
      const mute = $("#btn-mute")[0].innerText;
      const sceneNumber = $("#sceneNumber")[0].innerText;
      const title = $("#filmTitle")[0].innerText;
      window.location.href = `/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&mute=${mute}`;
    } else {
      $("#btn-next-scene").trigger("click");
    }
  }),
  $("#btn-next-scene").on("click", () => {
    const elementNumber = 0;
    const mute = $("#btn-mute")[0].innerText;
    const sceneNumber = parseInt($("#sceneNumber")[0].innerText) + 1;
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&mute=${mute}`;
  }),
  $("#btn-previous-scene").on("click", () => {
    const elementNumber = 0;
    const mute = $("#btn-mute")[0].innerText;
    const sceneNumber = parseInt($("#sceneNumber")[0].innerText) - 1;
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&mute=${mute}`;
  }),
  $("#btn-previous-element").on("click", () => {
    const mute = $("#btn-mute")[0].innerText;
    let sceneNumber = $("#sceneNumber")[0].innerText;
    let elementNumber = parseInt($("#elementNumber")[0].innerText) - 1;
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&mute=${mute}`;
  }),
  $("#btn-mute").on("click", () => {
    if ($("#btn-mute")[0].innerText === "MUTE") {
      $("#btn-mute")[0].innerText = "UNMUTE";
      $("audio").prop("muted", true);
    } else {
      $("#btn-mute")[0].innerText = "MUTE";
      $("audio").prop("muted", false);
    }
  }),
  $("html").keydown(function (e) {
    if (e.keyCode === 37) {
      let current = $("#current")[0].innerText;
      current--;
      const title = $("#filmTitle")[0].innerText;
      const mute = $("#btn-mute")[0].innerText;
      window.location.href = `/showreel?title=${title}&current=${current}&mute=${mute}`;
    }
    if (e.keyCode === 39) {
      let current = $("#current")[0].innerText;
      current++;
      const title = $("#filmTitle")[0].innerText;
      const mute = $("#btn-mute")[0].innerText;
      window.location.href = `/showreel?title=${title}&current=${current}&mute=${mute}`;
    }
  }),
  $("#btn-add-character").on("click", () => {
    if (($("#btn-add-character")[0].innerText === "Add Character")) {
      $("#table-characters-in-scene").hide();
      $("#btn-delete-character")[0].innerText = "Delete Character";
      $("#table-characters").show();
      $("#btn-add-character")[0].innerText = "CANCEL";
    } else {
      $("#table-characters").hide();
      $("#btn-add-character")[0].innerText = "Add Character";
    }
  }),
  $("#btn-delete-character").on("click", () => {
    if ($("#btn-delete-character")[0].innerText === "Delete Character") {
      $("#table-characters").hide();
      $("#btn-add-character")[0].innerText = "Add Character";
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
    const elementNumber = $("#elementNumber")[0].innerText;
    window.location.href = `/add-character-to-scene?title=${title}&sceneNumber=${sceneNumber}&character=${character}&elementNumber=${elementNumber}`;
  }),
  $(".btn-delete-char").on("click", (e) => {
    const character = e.target.value;
    const title = $("#filmTitle")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    window.location.href = `/delete-character-from-scene?title=${title}&sceneNumber=${sceneNumber}&character=${character}&elementNumber=${elementNumber}`;
  }),
  $("#input-note").on("focusout", (e) => {
    const val = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    const sceneNumber = $("#sceneNumber")[0].outerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    window.location.href = `/update-note?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&val=${val}&caller=showreel`;
  }),
  $(".btn-gen").on("click", (e) => {
    const elementNumber = e.target.value;
    voice = $(`#voice_${elementNumber}`)[0].innerText;
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/generate-single?title=${title}&elementNumber=${elementNumber}&voice=${voice}&caller=display`;
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
  $(".btn-change").on("click", () => {
    const title = $("#filmTitle")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    window.location.href = `/gallery?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&caller=showreel`;
  });
