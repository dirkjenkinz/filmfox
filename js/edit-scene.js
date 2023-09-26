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
  $("#ctv").on("click", () => {
    const f = $("#title")[0].innerText;
    let sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/ctv?filmFoxFile=${f}&sceneNumber=${sceneNumber}`;
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
  $(".btn-change").on("click", (e) => {
    const element = e.target.value;
    const title = $("#title")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    const scene = $("#scene")[0].innerText;
    window.location.href = `/gallery?title=${title}&element=${element}&scene=${scene}&caller=edit-scene`;
  });
