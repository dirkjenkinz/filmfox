$(window).on("load", function () {
  $("#nav-breakdown").addClass("active");
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

$(".btn-control").on("click", (e) => {
  let table = `table-${e.target.value}`;
  let control = `btn-control-${e.target.value}`;
  table = table.replace(/ /gi, "-");
  control = control.replace(/ /gi, "-");
  $(`#${table}`).show();
  $(`#${control}`).hide();
});

$(".btn-hide").on("click", (e) => {
  let table = `table-${e.target.value}`;
  let control = `btn-control-${e.target.value}`;
  table = table.replace(/ /gi, "-");
  control = control.replace(/ /gi, "-");
  $(`#${table}`).hide();
  $(`#${control}`).show();
});

$(".btn-add").on("click", (e) => {
  const element = e.target.value;
  const num = e.target.id.substring(11);
  const entity = $(`#input-entity-${num}`);

  let url = buildUrl("breakdown", "", "");
  url += `&element=${element}&entity=${entity}&action=add`;
  window.location.href = url;
});

$('.btn-del').on('click', (e)=> {
  const element = e.target.id.substring(4);
  const entity = e.target.value;
  const url = buildUrl('breakdown', '', '');
  window.location.href = `${url}&element=${element}&entity=${entity}&action=del`;
});

$(".btn-element").on("click", (e) => {
  if (window.getSelection().anchorNode) {
    const element = e.target.value;
    const snippet = window.getSelection().anchorNode.data;
    let start = window.getSelection().anchorOffset;
    let finish = window.getSelection().focusOffset;
    if (start > finish) {
      const temp = start;
      start = finish;
      finish = temp;
    };
    const entity = snippet.substring(start, finish).trim().toUpperCase();
    let url = buildUrl("breakdown", "", "");
    url += `&element=${element}&entity=${entity}&action=add`;
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

$("#btn-report").on("click", () => {
  const url = buildUrl("breakdown-report", '', "");
  window.location.href = url;
});
