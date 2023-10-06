$("#btn-display").on("click", () => {
    const title = $("#title")[0].innerText;
    const scene = $("#scene")[0].innerText;
    window.location.href = `/display?title=${title}&scene=${scene}`;
  }),
  $("#btn-front").on("click", () => {
    window.location.href = `/`;
  }),
    $("#btn-build-showreel").on("click", () => {
      const f = $("#title")[0].innerText;
      const scene = $("#scene")[0].innerText;
      window.location.href = `/build-showreel?title=${f}&scene=${scene}`;
    }),
    $('#btn-ctv').on('click', () => {
      const f = $('#title')[0].innerText
      let scene = $('#scene')[0].innerText
      window.location.href = `/ctv?filmFoxFile=${f}&scene=${scene}`
    }),
    $("#btn-characters").on("click", () => {
      const title = $("#title")[0].innerText;
      window.location.href = `/characters?title=${title}`;
    }),
    $("#btn-sound").on("click", () => {
      const f = $("#title")[0].innerText;
      const scene = $("#scene")[0].innerText;
      window.location.href = `/sound?title=${f}&scene=${scene}`;
    }),
    $("#btn-scenes").on("click", () => {
      const title = $("#title")[0].innerText;
      window.location.href = `/scenes?title=${title}`;
    }),
    $("#btn-video").on("click", () => {
      const title = $("#title")[0].innerText;
      const scene = $("#scene")[0].innerText;
      window.location.href = `/video?title=${title}&scene=${scene}`;
    }),
    $("#btn-scene-arranger").on("click", () => {
      const title = $("#title")[0].innerText;
      window.location.href = `/scene-arranger?title=${title}`;
    }),
    $("#btn-pages").on("click", () => {
      const title = $("#title")[0].innerText;
      window.location.href = `/pages?title=${title}&page=0`;
    }),
    $("#btn-display-full").on("click", (e) => {
      const title = $("#title")[0].innerText;
      window.location.href = `/scene-arranger?title=${title}&full=yes`;
    });