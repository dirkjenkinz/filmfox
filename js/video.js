// Wait for the document to be ready before executing the code
$(document).ready(() => {
  // Set the 'active' class for the 'nav-video' element
  $('#nav-video').addClass('active');

  // Function to generate elements based on film title and scene number
  const generateElements = (sceneNumber) => {
    const title = $('#filmTitle')[0].innerText;
    // Redirect to the create-video page with parameters
    window.location.href = `/create-video?title=${title}&sceneNumber=${sceneNumber}`;
  };

  // Event handler for 'btn-generate-elements' click
  $('.btn-generate-elements').on('click', (e) => {
    generateElements(e.target.value);
  });

  // Event handler for 'btn-generate-scene' click
  $('.btn-generate-scene').on('click', (e) => {
    generateElements(e.target.value);
  });

  // Event handler for 'btn-generate-all' click
  $('#btn-generate-all').on('click', () => {
    const title = $('#filmTitle')[0].innerText;
    // Redirect to generate-scene page with 'all' as the scene number
    window.location.href = `/generate-scene?title=${title}&sceneNumber=all`;
  });

  // Event handler for 'btn-concatenate-video' click
  $('#btn-concatenate-video').on('click', () => {
    const title = $('#filmTitle')[0].innerText;
    // Redirect to concatenate-video page with the film title as a parameter
    window.location.href = `/concatenate-video?title=${title}`;
  });
});
