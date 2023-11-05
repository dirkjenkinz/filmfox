$(() => {
  $("#nav-credits").addClass('active');
}),
  $("#input-writer").on("focusout", (e) => {
    const val = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    window.location.href = `/update-credits?title=${title}&credit=writer&val=${val}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
  }),
  $("#input-director").on("focusout", (e) => {
    const val = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    window.location.href = `/update-credits?title=${title}&credit=director&val=${val}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
  }),
  $("#input-producer").on("focusout", (e) => {
    const val = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    window.location.href = `/update-credits?title=${title}&credit=producer&val=${val}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
  }),
  $("#input-title").on("focusout", (e) => {
    const val = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    window.location.href = `/update-credits?title=${title}&credit=title&val=${val}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
  });
