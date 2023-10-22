$("#nav-front").on("click", () => {
  window.location.href = `/`;
}),
  $("#nav-ctv").on("click", () => {
    console.log("11111111111111");
    const f = $("#filmTitle")[0].innerText;
    window.location.href = `/ctv?filmFoxFile=${f}`;
  }),
  $("#nav-characters").on("click", () => {
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/characters?title=${title}`;
  }),
  $("#nav-sound").on("click", () => {
    const f = $("#filmTitle")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/sound?title=${f}&sceneNumber=${sceneNumber}`;
  }),
  $("#nav-video").on("click", () => {
    const title = $("#filmTitle")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/video?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $("#nav-arranger").on("click", () => {
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/scene-arranger?title=${title}`;
  }),
  $("#nav-pre-production").on("click", () => {
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/scene-arranger?title=${title}`;
  }),
  $("#nav-sheets").on("click", () => {
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/sheets?title=${title}&sheet=0`;
  }),
  $("#nav-display-full").on("click", () => {
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/scene-arranger?title=${title}&full=yes`;
  }),
  $("#nav-showreel").on("click", () => {
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/showreel?title=${title}&sceneNumber=0&elementNumber=0`;
  }),
  $("#nav-scene-shot-list").on("click", () => {
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/scene-shot-list?title=${title}&sceneNumber=0`;
  }),
  $("#nav-credits").on("click", () => {
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/credits?title=${title}`;
  });
