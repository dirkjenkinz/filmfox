$(".shot-select").on("change", (e) => {
  const line = e.target.id;
  const val = e.target.value;
  const title = $("#filmTitle")[0].outerText;
  const sceneNumber = $("#sceneNumber")[0].outerText;
  let l1 = line.substring(5).split('_');
  window.location.href = `/update-shot-list?title=${title}&sceneNumber=${sceneNumber}&val=${val}&item=${l1[0]}&line=${l1[1]}`
})
  $(".shot-subject").on("focusout", (e) => {
  const line = e.target.id.substring(13);
  const val = e.target.value;
  const title = $("#filmTitle")[0].outerText;
  const sceneNumber = $("#sceneNumber")[0].outerText;
  window.location.href = `/update-shot-list?title=${title}&sceneNumber=${sceneNumber}&val=${val}&item=subject&line=${line}`
  }),
  $(".shot-description").on("change", (e) => {
    const line = e.target.id.substring(17);
    const val = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    const sceneNumber = $("#sceneNumber")[0].outerText;
    window.location.href = `/update-shot-list?title=${title}&sceneNumber=${sceneNumber}&val=${val}&item=description&line=${line}`
   }),
   $(".btn-next").on("click", (e) => {
    const title = $("#filmTitle")[0].outerText;
    const sceneNumber = parseInt($("#sceneNumber")[0].outerText) + 1;
    window.location.href = `/scene-shot-list?title=${title}&sceneNumber=${sceneNumber}`
   }),
   $(".btn-previous").on("click", (e) => {
    const title = $("#filmTitle")[0].outerText;
    const sceneNumber = parseInt($("#sceneNumber")[0].outerText) - 1;
    window.location.href = `/scene-shot-list?title=${title}&sceneNumber=${sceneNumber}`
   }),
   $(".btn-add").on("click", (e) => {
    const line = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    const sceneNumber = $("#sceneNumber")[0].outerText;
    window.location.href = `/add-shot?title=${title}&sceneNumber=${sceneNumber}&line=${line}`
   }),
   $(".btn-delete").on("click", (e) => {
    const line = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    const sceneNumber = $("#sceneNumber")[0].outerText;
    window.location.href = `/delete-shot?title=${title}&sceneNumber=${sceneNumber}&line=${line}`
   }),
   $("#input-note").on("focusout", (e) => {
    const val = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    const sceneNumber = $("#sceneNumber")[0].outerText;
    window.location.href = `/update-note?title=${title}&sceneNumber=${sceneNumber}&val=${val}&caller=shot-list`;
  });
