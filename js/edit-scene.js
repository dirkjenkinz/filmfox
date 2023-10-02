$("#btn-change").on("click", (e) => {
  const element = e.target.value;r
  const title = $("#title")[0].innerText;
  const sceneNumber = $("#sceneNumber")[0].innerText;
  const scene = $("#scene")[0].innerText;
  window.location.href = `/gallery?title=${title}&element=${element}&scene=${scene}&caller=edit-scene`;
}),
$("#btn-back-to-scenes").on("click", () => {
  const note =$("#note")[0].value;
  const title = $("#title")[0].innerText;
  const scene = $("#scene")[0].innerText;
  window.location.href = `/back-to-scenes?title=${title}&scene=${scene}&note=${note}`;
});

