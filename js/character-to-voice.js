$(() => {
  $("#btn-ctv").attr("disabled", true);
}),
  $("select").on("change", function (e) {
    const num = this.name.substring(7);
    const id = this.id;
    const cid = `char_${num}`;
    const voice = $(`#${id} option:selected`).text().trim();
    const character = $(`#${cid}`)[0].textContent;
    const title = $("#filmTitle")[0].outerText;
    let scene = $("#scene")[0].innerText;
    window.location.href = `/character-update?filmFoxFile=${title}&character=${character}&voice=${voice}&scene=${scene}`;
  }),
  $('.btn-play-sample').on('click', (e) =>{
    const id = e.target.value;
    const title = $("#filmTitle")[0].innerText;
    const s = `../data/samples/${id}.mp3`;
    document.getElementById("master-play").setAttribute("src", s);
    document.getElementById("master-play").play();
  })
