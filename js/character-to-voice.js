$("#display").on("click", () => {
    const fff = $("#title")[0].outerText
    let ptr = $("#ptr")[0].innerText
    window.location.href = `/display?filmFoxFile=${fff}.fff&ptr=${ptr}`
  }),
  $('#btn-back').on('click', () => {
    const title = $('#title')[0].innerText;
    const ptr = $('#ptr')[0].innerText;
    window.location.href = `/display?title=${title}&ptr=${ptr}`;
  }),
    $("select").on("change", function (e) {
      const num = this.name.substring(7)
      const id = this.id
      const cid = `char_${num}`
      const voice = $(`#${id} option:selected`).text().trim()
      const character = $(`#${cid}`)[0].textContent
      const title = $("#title")[0].outerText
      let ptr = $("#ptr")[0].innerText
      window.location.href = `/character-update?filmFoxFile=${title}&character=${character}&voice=${voice}&ptr=${ptr}`
    })