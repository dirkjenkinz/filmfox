$(() => {
  $("#ctv"). attr("disabled", true)
}),
$("#display").on("click", () => {
  const title = $("#title")[0].innerText;
  const sceneNumber = $("#sceneNumber")[0].innerText;
  window.location.href = `/display?title=${title}&sceneNumber=${sceneNumber}`;
}),
$("#front").on("click", () => {
  window.location.href = `/`;
}),
  $("#btn-build-showreel").on("click", () => {
    const f = $("#title")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/build-showreel?title=${f}&sceneNumber=${sceneNumber}`;
  }),
  $("#btn-characters").on("click", () => {
    const title = $("#title")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/characters?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $("#btn-merge").on("click", () => {
    const f = $("#title")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/merge?title=${f}&sceneNumber=${sceneNumber}`;
  }),
  $("#btn-scenes").on("click", () => {
    const title = $("#title")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/scenes?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $("#btn-video").on("click", () => {
    const title = $("#title")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/video?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $("select").on("change", function (e) {
    const num = this.name.substring(7);
    const id = this.id;
    const cid = `char_${num}`;
    const voice = $(`#${id} option:selected`).text().trim();
    const character = $(`#${cid}`)[0].textContent;
    const title = $("#title")[0].outerText;
    let sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/character-update?filmFoxFile=${title}&character=${character}&voice=${voice}&sceneNumber=${sceneNumber}`;
  });
