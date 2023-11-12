$(() => {
  $("#scene-breakdown").addClass('active');
})

$("#slider-scene").on("input", (e) => {
  $("#output")[0].innerText = e.target.value;
})

$("#slider-scene").on("change", (e) => {
  const sceneNumber = $("#output")[0].innerText
  const title = $('#filmTitle')[0].innerText;
  const elementNumber = $('#elementNumber')[0].innerText;
  window.location.href = `/breakdown-report?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
})

  $("#btn-previous").on("click", (e) => {
    let sceneNumber = parseInt($("#sceneNumber")[0].innerText);
    sceneNumber--;
    const title = $('#filmTitle')[0].innerText;
    const elementNumber = $('#elementNumber')[0].innerText;
    window.location.href = `/breakdown-report?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
  })

  $("#btn-next").on("click", (e) => {
    let sceneNumber = parseInt($("#sceneNumber")[0].innerText);
    sceneNumber++;
    const elementNumber = $('#elementNumber')[0].innerText;
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/breakdown-report?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
  })

  $("#btn-pdf").on("click", (e) => {
    const sceneNumber = $('#sceneNumber')[0].innerText;
    const elementNumber = $('#elementNumber')[0].innerText;
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/breakdown-pdf?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
  });
