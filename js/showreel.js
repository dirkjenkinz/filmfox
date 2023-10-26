const buildUrl = (call, sceneNumber, elementNumber, speak) => {
  const mute = $("#btn-mute")[0].innerText;
  const title = $("#filmTitle")[0].innerText;
  return `/${call}?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&mute=${mute}&speak=${speak}`;
};

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
    const sceneNumber = e.target.value;
    const url = buildUrl("showreel", sceneNumber, 0, 'yes');
    window.location.href = url;
  }),
  $("#btn-next-element").on("click", () => {
    if (
      parseInt($("#elementNumber")[0].innerText) <
      parseInt($("#highestElement")[0].innerText)
    ) {
      const elementNumber = parseInt($("#elementNumber")[0].innerText) + 1;
      const sceneNumber = $("#sceneNumber")[0].innerText;
      const url = buildUrl("showreel", sceneNumber, elementNumber, 'yes');
      window.location.href = url;
    } else {
      $("#btn-next-scene").trigger("click");
    }
  }),
  $("#btn-next-scene").on("click", () => {
    const elementNumber = 0;
    const sceneNumber = parseInt($("#sceneNumber")[0].innerText) + 1;
    const url = buildUrl("showreel", sceneNumber, elementNumber, 'yes');
    window.location.href = url;
  }),
  $("#btn-previous-scene").on("click", () => {
    const sceneNumber = parseInt($("#sceneNumber")[0].innerText) - 1;
    const url = buildUrl("showreel", sceneNumber, 0, 'yes');
    window.location.href = url;
  }),
  $("#btn-previous-element").on("click", () => {
    let sceneNumber = $("#sceneNumber")[0].innerText;
    let elementNumber = parseInt($("#elementNumber")[0].innerText) - 1;
    const url = buildUrl("showreel", sceneNumber, elementNumber, 'yes');
    window.location.href = url;
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
  $("#btn-add-character").on("click", () => {
    if ($("#btn-add-character")[0].innerText === "Add Character") {
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
    const sceneNumber = $("#sceneNumber")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    let url = buildUrl("add-character-to-scene", sceneNumber, elementNumber, 'no');
    url = `${url}&character=${character}`;
    window.location.href = url;

  }),
  $(".btn-delete-char").on("click", (e) => {
    const character = e.target.value;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    let url = buildUrl("delete-character-from-scene", sceneNumber, elementNumber, 'no')
    url = `${url}&character=${character}`;
    window.location.href = url
  }),
  $("#input-note").on("focusout", (e) => {
    const val = e.target.value;
    const sceneNumber = $("#sceneNumber")[0].outerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    let url = buildUrl("update-note", sceneNumber, elementNumber, 'no')
    url = `${url}&val=${val}&caller=showreel`;
    window.location.href = url;
  }),
  $(".btn-gen").on("click", () => {
    const elementNumber = $("#elementNumber")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].outerText;
    let voice = $('#voice')[0].innerText;
//    voice = voice.substring(1, voice.length - 1);
    let url = buildUrl("generate-single", sceneNumber, elementNumber, 'no')
    url = `${url}&voice=${voice}`;
    $('#message').show();
    window.location.href = url;
  }),
  $(".btn-del").on("click", (e) => {
    if (confirm("Are you sure you want to delete this sound file?")) {
      const fileName = e.target.value;
      const sceneNumber = $("#sceneNumber")[0].innerText;
      const elementNumber = $("#elementNumber")[0].innerText;
      let url = buildUrl("delete", sceneNumber, elementNumber, 'no')
      url = `${url}&fileName=${fileName}`;
      window.location.href = url;
    }
  }),
  $(".btn-change").on("click", () => {
    const sceneNumber = $("#sceneNumber")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    let url = buildUrl("gallery", sceneNumber, elementNumber, 'no')
    url = `${url}&caller=showreel`;
    window.location.href = url;
  });
