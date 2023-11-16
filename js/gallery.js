const buildUrl = (call, sceneNumber, elementNumber) => {
  const title = $('#filmTitle')[0].innerText;
  if (sceneNumber === '') {
    sceneNumber = $('#sceneNumber')[0].innerText;
  }
  if (elementNumber === '') {
    elementNumber = $('#elementNumber')[0].innerText;
  }
  return `/${call}?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
};

$('.btn-select').on('click', (e) => {
  const image = e.target.value;
  const caller = $('#caller')[0].innerText;
  const url = buildUrl('update-image-display', '', '');
  window.location.href = `${url}&image=${image}&caller=${caller}`;
});

$('.btn-cancel').on('click', () => {
  const speak = $('#speak')[0].innerText;
  const mute = $('#mute')[0].innerText;
  const url = buildUrl('showreel', '', '');
  window.location.href = `${url}&speak=${speak}&mute=${mute}`;
});

$('#search').on('keypress', (e) => {
  const searchString = e.target.value + String.fromCharCode(e.which);
  
  let unusedSize = $('#unused-size')[0].innerText;
  for (let i = 0; i < unusedSize; i++){
    let ptr = ($(`#btn-unused-${i}`)[0].value).indexOf(searchString);
    if ($(`#btn-unused-${i}`)[0].value, ptr === -1)
    {
      $(`#unused-image-${i}`).hide();
      $(`#unused-sel-${i}`).hide();
    } else {
      $(`#unused-image-${i}`).show();
      $(`#unused-sel-${i}`).show();
    };
  };

  let usedSize = $('#used-size')[0].innerText;
  for (let i = 0; i < usedSize; i++){
    let ptr = ($(`#btn-used-${i}`)[0].value).indexOf(searchString);
    if ($(`#btn-used-${i}`)[0].value, ptr === -1)
    {
      $(`#used-image-${i}`).hide();
      $(`#used-sel-${i}`).hide();
    } else {
      $(`#used-image-${i}`).show();
      $(`#used-sel-${i}`).show();
    };
  };

});

$('#search').on('keydown', (e) => {
  if (e.keyCode === 8){
  
    let searchString = e.target.value;
    searchString = searchString.substring(0, searchString.length - 1);

    let unusedSize = $('#unused-size')[0].innerText;
    for (let i = 0; i < unusedSize; i++){
      let ptr = ($(`#btn-unused-${i}`)[0].value).indexOf(searchString);
      if ($(`#btn-unused-${i}`)[0].value, ptr === -1)
      {
        $(`#unused-image-${i}`).hide();
        $(`#unused-sel-${i}`).hide();
      } else {
        $(`#unused-image-${i}`).show();
        $(`#unused-sel-${i}`).show();
      };
    };

    let usedSize = $('#used-size')[0].innerText;
    for (let i = 0; i < usedSize; i++){
      let ptr = ($(`#btn-used-${i}`)[0].value).indexOf(searchString);
      if ($(`#btn-used-${i}`)[0].value, ptr === -1)
      {
        $(`#used-image-${i}`).hide();
        $(`#used-sel-${i}`).hide();
      } else {
        $(`#used-image-${i}`).show();
        $(`#used-sel-${i}`).show();
      };
    };
  
  };
});
