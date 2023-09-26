$(() => {
  $("#ctv").attr("disabled", true);
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
