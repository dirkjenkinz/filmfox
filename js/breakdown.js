$(window).on("load", function () {
d = $('#doc')[0].innerText;
  $('#box')[0].innerHTML = d;
});

const buildTable = (htmlArray) => {
  elementList = [];
  htmlArray.forEach((h) => {
    for (let i = 0; i < h.length; i++) {
      if (h.substring(i, i + 2) === "<s") {
        let str = h.substring(i + 13);
        let ptr2 = str.indexOf('"');
        let cl = str.substring(0, ptr2);
        let ptr3 = str.indexOf("</span>");
        let el = str
          .substring(ptr2 + 2, ptr3)
          .trim()
          .toUpperCase();
        elementList.push([cl, el]);
      }
    }
  });
  let tabCast = `<tr><th class='th-centre cast'>Cast</th></tr>`;
  let tabExtras = `<tr><th class='th-centre extras'>Extras</th></tr>`;
  let tabProps = `<tr><th class='th-centre props'>Props</th></tr>`;
  let tabDressing = `<tr><th class='th-centre props'>Dressing</th></tr>`;
  let tabCostumes = `<tr><th class='th-centre costumes'>Costumes</th></tr>`;
  let tabMakeup = `<tr><th class='th-centre makeup'>Makeup</th></tr>`;
  let tabVehicles = `<tr><th class='th-centre vehicles'>Vehicles</th></tr>`;
  let tabStunts = `<tr><th class='th-centre stunts'>Stunts</th></tr>`;
  let tabSpecialEffects = `<tr><th class='th-centre sfx'>Special Effects</th></tr>`;
  let tabLivestock = `<tr><th class='th-centre livestock'>Livestock</th></tr>`;
  let tabAnimalHandler = `<tr><th class='th-centre handler'>Animal Handler</th></tr>`;

  elementList.forEach((e) => {
    if (e[0] === "cast") {
      tabCast += `<tr><td class='td-left cast'>${e[1]}</td></tr>`;
    }
    if (e[0] === "extras") {
      tabExtras += `<tr><td class='td-left extras'>${e[1]}</td></tr>`;
    }
    if (e[0] === "props") {
      tabProps += `<tr><td class='td-left props'>${e[1]}</td></tr>`;
    }
    if (e[0] === "dressing") {
      tabDressing += `<tr><td class='td-left dressing'>${e[1]}</td></tr>`;
    }
    if (e[0] === "costumes") {
      tabCostumes += `<tr><td class='td-left costumes'>${e[1]}</td></tr>`;
    }
    if (e[0] === "makeup") {
      tabMakeup += `<tr><td class='td-left makeup'>${e[1]}</td></tr>`;
    }
    if (e[0] === "vehicles") {
      tabVehicles += `<tr><td class='td-left vehicles'>${e[1]}</td></tr>`;
    }
    if (e[0] === "stunts") {
      tabStunts += `<tr><td class='td-left stunts'>${e[1]}</td></tr>`;
    }
    if (e[0] === "sfx") {
      tabSpecialEffects += `<tr><td class='td-left sfx'>${e[1]}</td></tr>`;
    }
    if (e[0] === "livestock") {
      tabStunts += `<tr><td class='td-left livestock'>${e[1]}</td></tr>`;
    }
    if (e[0] === "handler") {
      tabSpecialEffects += `<tr><td class='td-left handler'>${e[1]}</td></tr>`;
    }
  });

  const elementsTable = `<table id='elementsTable'>
    <body class='tableFixHead3'>
        ${tabCast}<tr><td>&nbsp;</td></tr>
        ${tabExtras}<tr><td>&nbsp;</td></tr>
        ${tabProps}<tr><td>&nbsp;</td></tr>
        ${tabDressing}<tr><td>&nbsp;</td></tr>
        ${tabCostumes}<tr><td>&nbsp;</td></tr>
        ${tabMakeup}<tr><td>&nbsp;</td></tr>
        ${tabVehicles}<tr><td>&nbsp;</td></tr>
        ${tabStunts}<tr><td>&nbsp;</td></tr>
        ${tabSpecialEffects}<tr><td>&nbsp;</td></tr>
        ${tabLivestock}<tr><td>&nbsp;</td></tr>
        ${tabAnimalHandler}<tr><td>&nbsp;</td></tr>
    </body>
    </table>`;
  $("#elementsTable").remove();
  $("#gap").after(elementsTable);
};

$(".btn-element").on("click", (e) => {
  if (window.getSelection().anchorNode) {
    const element = e.target.value;

    const para = window.getSelection().anchorNode.parentElement.id;

    let start = window.getSelection().baseOffset;
    let finish = window.getSelection().focusOffset;
    if (start > finish) {
      const temp = start;
      start = finish;
      finish = temp;
    }

    const title = $("#filmTitle")[0].innerText;
    const elementNumber = $("#elementNumber")[0].innerText;
    const sceneNumber = $("#sceneNumber")[0].innerText;
    let url = `/breakdown?title=${title}&sceneNumber=${sceneNumber}&elementNumber=${elementNumber}`;
    url += `&para=${para}&start=${start}&finish=${finish}&element=${element}`;
    window.location.href = url;
  }
});
