$(window).on("load", function () {
  d = $("#breakdown")[0].innerText;
  $("#box")[0].innerHTML = d;
});

$(".btn-element").on("click", (e) => {
  if (window.getSelection().anchorNode) {
    const element = e.target.value;
    let para = window.getSelection().anchorNode.parentElement.id;
    para = para.substring(1);
    const snippet = window.getSelection().anchorNode.data;
    let start = window.getSelection().anchorOffset;
    let finish = window.getSelection().focusOffset;
    if (start > finish) {
      const temp = start;
      start = finish;
      finish = temp;
    }
    const title = $("#filmTitle")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    let url = `/breakdown?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
    url += `&para=${para}&start=${start}&finish=${finish}&element=${element}&snippet=${snippet}`;
    window.location.href = url;
  }
}),
  $("#btn-previous-scene").on("click", () => {
    const sceneNumber = parseInt($("#sceneNumber")[0].innerText) - 1;
    const elementNumber = $("#elementNumber")[0].innerText;
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/breakdown?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
  }),
  $("#btn-next-scene").on("click", () => {
    const sceneNumber = parseInt($("#sceneNumber")[0].innerText) + 1;
    const elementNumber = $("#elementNumber")[0].innerText;
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/breakdown?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
  }),
  $("#btn-last-scene").on("click", () => {
    const sceneNumber = $("#highestScene")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/breakdown?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
  }),
  $("#btn-first-scene").on("click", () => {
    const elementNumber = $("#elementNumber")[0].innerText;
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/breakdown?title=${title}&sceneNumber=1&elementNumber=${elementNumber}`;
  }),
  $("#btn-start-again").on("click", () => {
    if (confirm("Are you sure you want to remove all the element tags?")) {
      const sceneNumber = $("#sceneNumber")[0].innerText;
      const elementNumber = $("#elementNumber")[0].innerText;
      const title = $("#filmTitle")[0].innerText;
      window.location.href = `/breakdown?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}&restart=yes`;
    }
  });
