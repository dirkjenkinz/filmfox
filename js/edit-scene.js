$(".btn-change").on("click", (e) => {
  const element = e.target.value;
  const title = $("#title")[0].innerText;
  const sceneNumber = $("#sceneNumber")[0].innerText;
  const scene = $("#scene")[0].innerText;
  window.location.href = `/gallery?title=${title}&element=${element}&scene=${scene}&caller=edit-scene`;
});
