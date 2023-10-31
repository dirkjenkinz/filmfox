$("#btn-cast").on("click", function () {
  const string = window.getSelection().anchorNode.data;
  const start = window.getSelection().baseOffset;
  const finish = window.getSelection().focusOffset
  const left = string.substring(0, start);
  const mid = string.substring(start, finish);
  const right = string.substring(finish);
  newString = `${left}[=cast=]${mid}[=/cast=]${right}`;
  window.getSelection().anchorNode.data = newString;
  
  const displayHTML = $("#display")[0].innerHTML;
  let htmlArray = displayHTML.split('<p');
  let newHTML = '';
   for (let i = 1; i < htmlArray.length; i++){
    htmlArray[i] = '<p' + htmlArray[i];
    let ptr = htmlArray[i].indexOf('</p>');
    htmlArray[i] = htmlArray[i].substring(0, ptr + 4);
    htmlArray[i] = htmlArray[i].replace('[=cast=]', '<span class="cast">');
    htmlArray[i] = htmlArray[i].replace('[=/cast=]', '</span>');
    newHTML += htmlArray[i];
   };
   $("#display")[0].innerHTML = newHTML;
});
