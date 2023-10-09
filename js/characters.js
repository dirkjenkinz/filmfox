$(() => {
  $("#btn-characters").attr("disabled", true);
}),
  $(".btn-edit-character").on("click", (e) => {
    console.log({e});
    const character = e.target.value;
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/edit-character?title=${title}&character=${character}`;
  });
