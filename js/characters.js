$(() => {
  $("#btn-characters").attr("disabled", true);
}),
  $(".btn-edit-character").on("click", (e) => {
    const character = e.target.value;
    const title = $("#title")[0].innerText;
    window.location.href = `/edit-character?title=${title}&character=${character}`;
  });
