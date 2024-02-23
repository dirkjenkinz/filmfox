$(() => {
  // Add 'active' class to the navigation link for scene arranger
  $('#nav-arranger').addClass('active');

  // Set the initial scroll position of the scene arranger table
  $('#table1')[0].scrollTop = $('#scr1')[0].innerText;
});

$('#btn-reset').on('click', (e) => {
  // Ask for confirmation before resetting the scene order
  if (confirm('Are you sure you want to reset the scene order?')) {
    const title = $('#filmTitle')[0].innerText;
    const scr1 = $('#table1')[0].scrollTop;

    // Redirect to change-scene-order route with reset flag
    window.location.href = `/change-scene-order?title=${title}&scr1=${scr1}&reset=yes`;
  }
});

$('.scene-box').on('click', (e) => {
  const size = $('#size')[0].innerText;
  const num = e.target.id.substring(3);
  let phase = $('#phase')[0].innerText;

  if (phase === 'select') {
    // Add 'selected' class to the clicked scene box
    $(`#sc_${num}`).addClass('selected');
    $(`#sl_${num}`).addClass('selected');
    $(`#sh_${num}`).addClass('selected');

    // Set the selected element number and change the phase to 'drop'
    $('#elementNumber')[0].innerText = num;
    $('#phase')[0].innerText = 'drop';
  } else {
    // Remove 'selected' class from all scene boxes
    for (let num = 0; num < size; num++) {
      $(`#sc_${num}`).removeClass('selected');
      $(`#sl_${num}`).removeClass('selected');
      $(`#sh_${num}`).removeClass('selected');
    }

    // Get the 'from' element number and redirect to change-scene-order route
    const from = $('#elementNumber')[0].innerText;
    const title = $('#filmTitle')[0].innerText;
    const scr1 = $('#table1')[0].scrollTop;
    window.location.href = `/change-scene-order?title=${title}&scr1=${scr1}&from=${from}&to=${num}&reset=no`;
  }
});

let highlight = $('.scene-box');

highlight.hover(
  function () {
    // Increase opacity on hover
    $(this).css('opacity', '1');
    highlight.not(this).css('opacity', '.8');
  },
  function () {
    // Reset opacity on mouseout
    highlight.css('opacity', '1');
  }
);
