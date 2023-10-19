$(() => {
  $("#nav-characters").addClass('active');
}),
  $(".btn-edit-character").on("click", (e) => {
    const character = e.target.value;
    const title = $("#filmTitle")[0].innerText;
    window.location.href = `/edit-character?title=${title}&character=${character}`;
  });
