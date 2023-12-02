$(() => {
  $('#nav-arranger').addClass('active');
});

$('#btn-reset').on('click', (e) => {
  if (confirm('Are you sure you want to reset the scene order?')) {
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/change-scene-order?title=${title}&scr1=${scr1}&reset=yes`;
  };
});

$('.scene-box').on('click', (e) => {
  const size = $('#size')[0].innerText;
  const num = e.target.id.substring(3);
  let phase = $('#phase')[0].innerText;
  if (phase === 'select') {
    $(`#sc_${num}`).addClass('selected');
    $(`#sl_${num}`).addClass('selected');
    $(`#sh_${num}`).addClass('selected');
    $('#elementNumber')[0].innerText = num;
    $('#phase')[0].innerText = 'drop';
  } else {
    for (let num = 0; num < size; num++) {
      $(`#sc_${num}`).removeClass('selected');
      $(`#sl_${num}`).removeClass('selected');
      $(`#sh_${num}`).removeClass('selected');
    };
    const from = $('#elementNumber')[0].innerText;
    const title = $('#filmTitle')[0].innerText;
    window.location.href = `/change-scene-order?title=${title}&scr1=${scr1}&from=${from}&to=${num}&reset=no`;
  };
});

let highlight = $('.scene-box');

highlight.hover(
  function () {
    $(this).css('opacity', '1');
    highlight.not(this).css('opacity', '.8');
  }, function () {
    highlight.css('opacity', '1');
  }
);