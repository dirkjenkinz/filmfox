$("#btn-change").on("click", (e) => {
  const element = e.target.value;
  const title = $("#title")[0].innerText;
  const scene = $("#scene")[0].innerText;
  const note =$("#note")[0].value;
  window.location.href = `/gallery?title=${title}&element=${element}&scene=${scene}&note=${note}&caller=edit-scene`;
});

