$(".btn-element").on("click",(e)=>{
    const element = e.target.value;
    const string = window.getSelection().anchorNode.data;
    const start = window.getSelection().baseOffset;
    const finish = window.getSelection().focusOffset
    const left = string.substring(0, start);
    const mid = string.substring(start, finish);
    const right = string.substring(finish);
    window.getSelection().anchorNode.data = `${left}[=${element}=]${mid}[=/${element}=]${right}`;
    const displayHTML = $("#display")[0].innerHTML;
    let htmlArray = displayHTML.split('<p');
    let newHTML = '';
     for (let i = 1; i < htmlArray.length; i++){
      htmlArray[i] = '<p' + htmlArray[i];
      let ptr = htmlArray[i].indexOf('</p>');
      htmlArray[i] = htmlArray[i].substring(0, ptr + 4);
      htmlArray[i] = htmlArray[i].replace(`[=${element}=]`, `<span class="${element}">`);
      htmlArray[i] = htmlArray[i].replace(`[=/${element}=]`, '</span>');
      newHTML += htmlArray[i];
     };
     $("#display")[0].innerHTML = newHTML;
});
