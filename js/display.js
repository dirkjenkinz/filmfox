/*
$(() => {
  const e = $("#scene")[0].innerText;
  const element = `row_${e}`;
  const elm = document.getElementById(element);
  elm.scrollIntoView(true);
  $("#display").attr("disabled", true);
}),
*/
$(() => {
  $("#btn-display").attr("disabled", true);
}),
  $(".btn-gen").on("click", (e) => {
    const elementNumber = e.target.value;
    voice = $(`#voice_${elementNumber}`)[0].innerText;
    const title = $("#title")[0].innerText;
    window.location.href = `/generate-single?title=${title}&elementNumber=${elementNumber}&voice=${voice}&caller=display`;
  }),
$(".btn-scene-shot-list").on("click", (e) => {
    const title = $("#title")[0].innerText;
    const scene = $("#scene")[0].innerText;
    window.location.href = `/scene-shot-list?title=${title}&scene=${scene}`;
  }),
  $(".btn-play").on("click", (e) => {
    const title = $("#title")[0].innerText;
    const s = `../data/${title}/sounds/${e.target.value}`;
    document.getElementById("master-play").setAttribute("src", s);
    document.getElementById("master-play").play();
    console.log($("#bod"));
    console.log($("#bod").height());
  }),
  $(".btn-del").on("click", (e) => {
    const num = e.target.id.substring(4);
    const title = $("#title")[0].innerText;
    const scene = $("#scene")[0].innerText;
    const element = `${e.target.value}`;
    window.location.href = `/delete?title=${title}&element=${element}&scene=${scene}&sub=sounds&num=${num}`;
  }),
  $("#btn-next").on("click", (e) => {
    const title = $("#title")[0].innerText;
    scNum = parseInt(e.target.value) + 1;
    window.location.href = `/display?title=${title}&  scene=${scNum}&locked='yes`;
  }),
  $("#btn-previous").on("click", (e) => {
    const title = $("#title")[0].innerText;
    scNum = parseInt(e.target.value) - 1;
    window.location.href = `/display?title=${title}&scene=${scNum}locked='yes`;
  }),
  $(".btn-change").on("click", (e) => {
    const title = $("#title")[0].innerText;
    let sceneNumber = $("#sceneNumber")[0].innerText;
    const element = e.target.value;
    window.location.href = `/gallery?title=${title}&scene=${sceneNumber}&element=${element}&caller=display`;
  }),
  $("#input-note").on("focusout", (e) => {
    const val = e.target.value;
    const title = $("#title")[0].outerText;
    const scene = $("#scene")[0].outerText;
    window.location.href = `/update-note?title=${title}&scene=${scene}&val=${val}`;
  }),
  $("#btn-sound-lock").on("click", () => {
    const l = $("#length")[0].innerText;
    if ($("#btn-sound-lock")[0].innerText === "Lock Delete") {
      $("#btn-sound-lock")[0].innerText = "Unlock Delete";
      for (let i = 0; i < l; i++) {
        $(`#del_${i}`).attr("disabled", true);
      }
    } else {
      $("#btn-sound-lock")[0].innerText = "Lock Delete";
      for (let i = 0; i < l; i++) {
        $(`#del_${i}`).attr("disabled", false);
      }
    }
  });
