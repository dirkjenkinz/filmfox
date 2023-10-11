$(() => {
  $("#btn-sheets").attr("disabled", true);
}),
  $("#btn-previous").on("click", (e) => {
    let sheet = parseInt($("#sheet")[0].innerText);
    sheet--;
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/sheets?title=${title}&sheet=${sheet}`;
  }),
  $("#btn-next").on("click", (e) => {
    let sheet = parseInt($("#sheet")[0].innerText);
    sheet++;
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/sheets?title=${title}&sheet=${sheet}`;
  }),
  $("#btn-pdf").on("click", (e) => {
    let sheet = parseInt($("#sheet")[0].innerText);
    let scene = $('#sceneNum')[0].innerText;
    sceneNumber = scene.substring(6);
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/pdf?title=${title}&sheetNumber=${sheet}&sceneNumber=${sceneNumber}`;
  });
