$(window).on("load", function () {
  $("#nav-breakdown").addClass("active");
  $("#box")[0].innerHTML = $("#breakdown")[0].innerText;
  $("#elements-display")[0].innerHTML = $("#hidden-table")[0].innerText;
  if ($("#which")[0].innerText === "script") {
    $("#elements-display").hide();
    $("#btn-which")[0].innerText = "SWITCH TO ELEMENTS VIEW";
  } else {
    $("#box").hide();
    $("#btn-which")[0].innerText = "SWITCH TO SCENE VIEW";
  }
});

const buildUrl = (call, sceneNumber, elementNumber) => {
  const title = $("#filmTitle")[0].innerText;
  if (sceneNumber === "") {
    sceneNumber = $("#sceneNumber")[0].innerText;
  }
  if (elementNumber === "") {
    elementNumber = $("#elementNumber")[0].innerText;
  }
  return `/${call}?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
};

$("#btn-which").on("click", (e) => {
  let which = "script";
  if ($("#btn-which")[0].innerText === "SWITCH TO ELEMENTS VIEW") {
    which = "elements";
  }
  const url = buildUrl("breakdown", "", "");
  window.location.href = `${url}&which=${which}`;
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
    let url = buildUrl("breakdown", "", "");
    url += `&para=${para}&start=${start}&finish=${finish}&element=${element}&snippet=${snippet}`;
    window.location.href = url;
  }
});

$("#btn-previous-scene").on("click", () => {
  const sceneNumber = parseInt($("#sceneNumber")[0].innerText) - 1;
  let url = buildUrl("breakdown", sceneNumber, "");
  window.location.href = url;
});

$("#btn-next-scene").on("click", () => {
  const sceneNumber = parseInt($("#sceneNumber")[0].innerText) + 1;
  const url = buildUrl("breakdown", sceneNumber, "");
  window.location.href = url;
});

$("#btn-last-scene").on("click", () => {
  const sceneNumber = $("#highestScene")[0].innerText;
  const url = buildUrl("breakdown", sceneNumber, "");
  window.location.href = url;
});

$("#btn-first-scene").on("click", () => {
  const url = buildUrl("breakdown", 1, "");
  window.location.href = url;
});

$("#btn-start-again").on("click", () => {
  if (confirm("Are you sure you want to remove all the element tags?")) {
    const url = buildUrl('breakdown','','')
    window.location.href = `${url}&restart=yes`;
  }
});
