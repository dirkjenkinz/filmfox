$(() => {
  $("#scene-breakdown").addClass('active');
}),
$("#slider-scene").on("input", (e) => {
  $("#output")[0].innerText = e.target.value;
}),
$("#slider-scene").on("change", (e) => {
  const sceneNumber = $("#output")[0].innerText
  const title = $('#filmTitle')[0].innerText;
  window.location.href = `/breakdown-report?title=${title}&sceneNumber=${sceneNumber}`;
}),
  $("#btn-previous").on("click", (e) => {
    let sceneNumber = parseInt($("#sceneNumber")[0].innerText);
    sceneNumber--;
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/breakdown-report?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $("#btn-next").on("click", (e) => {
    let sceneNumber = parseInt($("#sceneNumber")[0].innerText);
    sceneNumber++;
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/breakdown-report?title=${title}&sceneNumber=${sceneNumber}`;
  }),
  $("#btn-pdf").on("click", (e) => {
    let sceneNumber = $('#sceneNumber')[0].innerText;
    sceneNumber = scene.substring(6);
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/breakdown-pdf?title=${title}&&sceneNumber=${sceneNumber}`;
  });
