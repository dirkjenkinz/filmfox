$(() => {
  $("#nav-characters").addClass('active');
}),
  $(".btn-edit-character").on("click", (e) => {
    const character = e.target.value;
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/edit-character?title=${title}&character=${character}`;
  }),
  $(".btn-add-character").on("click", () => {
    character = $('#input-add-character')[0].value.toUpperCase();
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/add-character?title=${title}&character=${character}`;
  });
