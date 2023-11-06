  $(".btn-hide").on("click", (e) => {
    const num = e.target.value;
    $(`#table-shots-list-${num}`).toggle();
  }),
  $("#btn-hide-all").on("click", () => {
    const length = $("#size")[0].innerText;
    for (let num = 0; num < length; num++) {
      $(`#table-shots-list-${num}`).hide();
    }
  }),
  $("#btn-hide-and-show").on("click", () => {
    const length = $("#size")[0].innerText;
    if ($('#btn-hide-and-show')[0].innerText === 'Hide All'){
    for (let num = 0; num < length; num++) {
      $(`#table-shots-list-${num}`).hide();
    }
    $('#btn-hide-and-show')[0].innerText = 'Show All'
  } else {
    for (let num = 0; num < length; num++) {
      $(`#table-shots-list-${num}`).show();
    }
    $('#btn-hide-and-show')[0].innerText = 'Hide All'
  };
  }),
  $("#btn-reveal-all").on("click", () => {
    const length = $("#size")[0].innerText;
    for (let num = 0; num < length; num++) {
      $(`#table-shots-list-${num}`).show();
    }
  }),
   $(".btn-down").on("click", (e) => {
    const size = $("#size")[0].innerText;
    const hidden = [];
    for (let i = 0; i < size; i++) {
      hidden.push($(`#table-shots-list-${i}`).is(":hidden"));
    };
    const num = e.target.value;
    const title = $("#filmTitle")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/change-scene-order?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}&direction=down&num=${num}&hidden=${hidden}`;
  }),
  $(".btn-up").on("click", (e) => {
    const size = $("#size")[0].innerText;
    const hidden = [];
    for (let i = 0; i < size; i++) {
      hidden.push($(`#table-shots-list-${i}`).is(":hidden"));
    };
    const num = e.target.value;
    const title = $("#filmTitle")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    window.location.href = `/change-scene-order?title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}&direction=up&num=${num}&hidden=${hidden}`
  });
