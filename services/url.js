const buildUrl = (call, sceneNumber, elementNumber) => {
  const mute = $("#btn-mute")[0].innerText;
  const title = $("#filmTitle")[0].innerText;
  if (sceneNumber === "") {
    sceneNumber = $("#sceneNumber")[0].innerText;
  }
  if (elementNumber === "") {
    elementNumber = $("#elementNumber")[0].innerText;
  }
  return `/${call}?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
};

module.exports = { buildUrl };
