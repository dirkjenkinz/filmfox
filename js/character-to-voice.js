$("#display").on("click", () => {
    const fff = $("#title")[0].outerText
    let sceneNumber = $("#sceneNumber")[0].innerText
    window.location.href = `/display?filmFoxFile=${fff}.fff&sceneNumber=${sceneNumber}`
  }),
  $('#btn-back').on('click', () => {
    const title = $('#title')[0].innerText;
    const sceneNumber = $('#sceneNumber')[0].innerText;
    window.location.href = `/display?title=${title}&sceneNumber=${sceneNumber}`;
  }),
    $("select").on("change", function (e) {
      const num = this.name.substring(7)
      const id = this.id
      const cid = `char_${num}`
      const voice = $(`#${id} option:selected`).text().trim()
      const character = $(`#${cid}`)[0].textContent
      const title = $("#title")[0].outerText
      let sceneNumber = $("#sceneNumber")[0].innerText
      window.location.href = `/character-update?filmFoxFile=${title}&character=${character}&voice=${voice}&sceneNumber=${sceneNumber}`
    })