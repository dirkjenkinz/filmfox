$(() => {
    $("#btn-video").attr("disabled", true);
  }),
  $('.btn-generate').on('click', (e) => {
    console.log(({e}))
    const title = $('#filmTitle')[0].innerText;
    const sceneNumber = e.target.value;
    console.log({title})
    console.log(({sceneNumber}))
    window.location.href = `/create-video?title=${title}&sceneNumber=${sceneNumber}`
  });   