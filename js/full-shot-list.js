// Button to hide or show all tables
$('#btn-hide-and-show').on('click', () => {
  const length = $('#size')[0].innerText;
  if ($('#btn-hide-and-show')[0].innerText === 'Hide All') {
    // Hide all tables if currently visible
    for (let num = 0; num < length; num++) {
      $(`#table-shots-list-${num}`).hide();
    }
    $('#btn-hide-and-show')[0].innerText = 'Show All';
  } else {
    // Show all tables if currently hidden
    for (let num = 0; num < length; num++) {
      $(`#table-shots-list-${num}`).show();
    }
    $('#btn-hide-and-show')[0].innerText = 'Hide All';
  }
});

// Button click event for a specific scene
$('.btn-scene').on('click', (e) => {
  const sceneNumber = e.target.value;
  const elementNumber = $('#elementNumber')[0].innerText;
  const title = $('#filmTitle')[0].innerText;
  // Redirect to the scene shot list with the specified details
  window.location.href = `/scene-shot-list?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
});

// Slider input event for scene selection
$('#slider-scene').on('input', (e) => {
  // Update the displayed scene number while sliding
  $('#output')[0].innerText = `${e.target.value}`;
});

// Slider change event for finalizing scene selection
$('#slider-scene').on('change', (e) => {
  const top = e.target.value;
  const title = $('#filmTitle')[0].innerText;
  const elementNumber = $('#elementNumber')[0].innerText;
  const sceneNumber = $('#sceneNumber')[0].innerText;
  // Redirect to the scene arranger with the selected scene details
  window.location.href = `/scene-arranger?top=${top}&title=${title}&elementNumber=${elementNumber}&sceneNumber=${sceneNumber}`;
});
