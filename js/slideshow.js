// Function to build slideshow URL
const buildUrl = (sceneNumber, elementNumber) => {
  const title = $('#filmTitle')[0].innerText;
  return `/slideshow?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
};

$(() => {
  // Set timeout to trigger nextElement after audioLength seconds
  const audioLength = parseInt($('#audioLength')[0].innerText) + 1;
  setTimeout(nextElement, audioLength);
});

// Handle keyboard navigation
$(document).keydown((e) => {
  const keyCode = e.keyCode || e.which;

  switch (keyCode) {
    case 37: // Left Arrow Key
      $('#btn-back').trigger('click');
      break;
    case 38: // Up Arrow Key
    case 39: // Right Arrow Key
      $('#btn-forward').trigger('click');
      break;
    case 40: // Down Arrow Key
      $('#btn-back').trigger('click');
      break;
  }
});

// Event handler for backward navigation
$('#btn-back').on('click', () => {
  const title = $('#filmTitle')[0].innerText;
  let sceneNumber = $('#sceneNumber')[0].innerText;
  let elementNumber = parseInt($('#elementNumber')[0].innerText) - 1;
  window.location.href = buildUrl(sceneNumber, elementNumber);
});

// Event handler for forward navigation
$('#btn-forward').on('click', () => {
  nextElement();
});

// Function to navigate to the next element or scene
const nextElement = () => {
  const highestElement = parseInt($('#highestElement')[0].innerText);
  const highestScene = parseInt($('#highestScene')[0].innerText);
  let elementNumber = parseInt($('#elementNumber')[0].innerText) + 1;
  let sceneNumber = parseInt($('#sceneNumber')[0].innerText);

  if (elementNumber < highestElement) {
    const url = buildUrl(sceneNumber, elementNumber);
    window.location.href = url;
  } else {
    $('#btn-next-scene').trigger('click');
    elementNumber = 0;
    sceneNumber = parseInt($('#sceneNumber')[0].innerText) + 1;

    if (sceneNumber < highestScene) {
      const url = buildUrl(sceneNumber, elementNumber);
      window.location.href = url;
    }
  }
};

// Event handler to quit slideshow and return to showreel
$('#btn-quit-slideshow').on('click', () => {
  const title = $('#filmTitle')[0].innerText;
  const sceneNumber = $('#sceneNumber')[0].innerText;
  const elementNumber = $('#elementNumber')[0].innerText;
  window.location.href = `/showreel?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
});
