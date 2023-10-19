$(() => {
  $("#nav-edit-scene").addClass('active');
}),
$("#btn-change").on("click", (e) => {
  const element = e.target.value;
  const title = $("#filmTitle")[0].innerText;
  const sceneNumber = $("#sceneNumber")[0].innerText;
  const note =$("#note")[0].value;
  window.location.href = `/gallery?title=${title}&element=${element}&sceneNumber=${sceneNumber}&note=${note}&caller=edit-scene`;
});

