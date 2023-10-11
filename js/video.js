$(() => {
    $("#btn-video").attr("disabled", true);
  }),
  $('.btn-generate').on('click', (e) => {
    const title = $('#filmTitle')[0].innerText;
    const scene = e.target.value;
    window.location.href = `/create-video?title=${title}&scene=${scene}`
  })
  $('#btn-back').on('click', () => {
    const fs = fs;
    const title = $('#filmTitle')[0].innerText;
    const scene = $('#scene')[0].innerText;
    window.location.href = `/display?title=${title}&scene=${scene}`;
  });   