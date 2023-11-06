const buildParentUrl = (call, sceneNumber, elementNumber) => {
  const title = $("#filmTitle")[0].innerText;
  return `/${call}?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
};

$("#nav-front").on("click", () => {
  window.location.href = `/`;
});

$("#nav-ctv").on("click", () => {
  const sceneNumber = $("#sceneNumber")[0].innerText;
  const elementNumber = $("#elementNumber")[0].innerText;
  const url = buildParentUrl("ctv", sceneNumber, elementNumber);
  window.location.href = url;
});

$("#nav-characters").on("click", () => {
  const sceneNumber = $("#sceneNumber")[0].innerText;
  const elementNumber = $("#elementNumber")[0].innerText;
  const url = buildParentUrl("characters", sceneNumber, elementNumber);
  window.location.href = url;
});

$("#nav-sound").on("click", () => {
  const sceneNumber = $("#sceneNumber")[0].innerText;
  const elementNumber = $("#elementNumber")[0].innerText;
  const url = buildParentUrl("sound", sceneNumber, elementNumber);
  window.location.href = url;
});

$("#nav-video").on("click", () => {
  const sceneNumber = $("#sceneNumber")[0].innerText;
  const elementNumber = $("#elementNumber")[0].innerText;
  const url = buildParentUrl("video", sceneNumber, elementNumber);
  window.location.href = url;
});

$("#nav-arranger").on("click", () => {
  const sceneNumber = $("#sceneNumber")[0].innerText;
  const elementNumber = $("#elementNumber")[0].innerText;
  const url = buildParentUrl("scene-arranger", sceneNumber, elementNumber);
  window.location.href = url;
});

$("#nav-sheets").on("click", () => {
  const sceneNumber = $("#sceneNumber")[0].innerText;
  const elementNumber = $("#elementNumber")[0].innerText;
  const url = buildParentUrl("sheets", sceneNumber, elementNumber);
  window.location.href = url;
});

$("#nav-display-full").on("click", () => {
  const title = $("#filmTitle")[0].innerText;
  const sceneNumber = $("#sceneNumber")[0].innerText;
  const elementNumber = $("#elementNumber")[0].innerText;
  window.location.href = `/scene-arranger?title=${title}&full=yes&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
});

$("#nav-showreel").on("click", () => {
  const title = $("#filmTitle")[0].innerText;
  let sceneNumber = $("#sceneNumber")[0].innerText;
  let elementNumber = $("#elementNumber")[0].innerText;
  if (!sceneNumber) sceneNumber = 0;
  if (!elementNumber) elementNumber = 0;
  window.location.href = `/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&speak=no`;
});

$("#nav-scene-shot-list").on("click", () => {
  const sceneNumber = $("#sceneNumber")[0].innerText;
  const elementNumber = $("#elementNumber")[0].innerText;
  const url = buildParentUrl("scene-shot-list", sceneNumber, elementNumber);
  window.location.href = url;
});

$("#nav-breakdown").on("click", () => {
  const sceneNumber = $("#sceneNumber")[0].innerText;
  const elementNumber = $("#elementNumber")[0].innerText;
  const url = buildParentUrl("breakdown", sceneNumber, elementNumber);
  window.location.href = url;
});

$("#nav-credits").on("click", () => {
  const sceneNumber = $("#sceneNumber")[0].innerText;
  const elementNumber = $("#elementNumber")[0].innerText;
  const url = buildParentUrl("credits", sceneNumber, elementNumber);
  window.location.href = url;
});
