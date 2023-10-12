$("#btn-display").on("click", () => {
    const title = $("#filmTitle")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/display?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $("#btn-front").on("click", () => {
    window.location.href = `/`;
  }),
    $('#btn-ctv').on('click', () => {
      const f = $('#filmTitle')[0].innerText
      window.location.href = `/ctv?filmFoxFile=${f}`
    }),
    $("#btn-characters").on("click", () => {
      const title = $("#filmTitle")[0].innerText;
      window.location.href = `/characters?title=${title}`;
    }),
    $("#btn-sound").on("click", () => {
      const f = $("#filmTitle")[0].innerText;
      const sceneNumber = $("#sceneNumber")[0].innerText;
      window.location.href = `/sound?title=${f}&sceneNumber=${sceneNumber}`;
    }),
    $("#btn-scenes").on("click", () => {
      const title = $("#filmTitle")[0].innerText;
      window.location.href = `/scenes?title=${title}`;
    }),
    $("#btn-video").on("click", () => {
      const title = $("#filmTitle")[0].innerText;
      const sceneNumber = $("#sceneNumber")[0].innerText;
      window.location.href = `/video?title=${title}&sceneNumber=${sceneNumber}`;
    }),
    $("#btn-scene-arranger").on("click", () => {
      const title = $("#filmTitle")[0].innerText;
      window.location.href = `/scene-arranger?title=${title}`;
    }),
    $("#btn-sheets").on("click", () => {
      const title = $("#filmTitle")[0].innerText;
      window.location.href = `/sheets?title=${title}&sheet=0`;
    }),
    $("#btn-display-full").on("click", (e) => {
      const title = $("#filmTitle")[0].innerText;
      window.location.href = `/scene-arranger?title=${title}&full=yes`;
    }),
    $("#btn-showreel").on("click", (e) => {
      const title = $("#filmTitle")[0].innerText;
      window.location.href = `/showreel?title=${title}&sceneNumber=0&elementNumber=0`;
    });