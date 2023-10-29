const buildParentUrl = (call, sceneNumber, elementNumber) => {
  const title = $("#filmTitle")[0].innerText;
  return `/${call}?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
};

$("#nav-front").on("click", () => {
  window.location.href = `/`;
}),
  $("#nav-ctv").on("click", () => {
    const f = $("#filmTitle")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    const url = buildParentUrl('ctv', sceneNumber, elementNumber)
    window.location.href = url;
  }),
  $("#nav-characters").on("click", () => {
    const title = $("#filmTitle")[0].innerText;
    const url = buildParentUrl('characters', sceneNumber, elementNumber)
    window.location.href = url;
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
    const sceneNumber = $("#sceneNumber")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    window.location.href = `/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&speak=no`;
  }),
  $("#nav-scene-shot-list").on("click", () => {
    const title = $("#filmTitle")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/scene-shot-list?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $("#nav-credits").on("click", () => {
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/credits?title=${title}`;
  });
