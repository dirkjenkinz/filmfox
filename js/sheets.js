$(() => {
  $("#btn-sheets").attr("disabled", true);
}),
  $("#btn-previous").on("click", (e) => {
    let sheet = parseInt($("#sheet")[0].innerText);
    sheet--;
    const title = $('#title')[0].innerText;
    window.location.href = `/sheets?title=${title}&sheet=${sheet}`;
  }),
  $("#btn-next").on("click", (e) => {
    let sheet = parseInt($("#sheet")[0].innerText);
    sheet++;
    const title = $('#title')[0].innerText;
    window.location.href = `/sheets?title=${title}&sheet=${sheet}`;
  });
