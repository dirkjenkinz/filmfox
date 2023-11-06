"use strict";

const url = require("url");
const { smartLog } = require("../services/smart-log");
const {
  readFile,
  writeFile,
  createDirectory,
  getFileList,
} = require("../services/file-service");

const buildSection = (element, heading, list) => {
  let section = `<tr><th class='${element}' colspan='2'>${heading}</th></tr>`;
  list.forEach((e) => {
    section += `<tr>
    <td>${e}</td>
    <td><button type='button' class='btn-del' id='btn-del-${element}' value='${e}'>Delete Element</button></td>
    </tr>`;
  });
  section += `<td width = '50%'></td><td style='width: '50%;'><button type='button' class='btn-add' value='cast'>Add Element</button></td>`;
  return section;
};

const createElementsTable = (list, breakdown) => {
  let table = `<table style='font-size: 75%; width: 50%;'><thead>`;
  table += buildSection("cast", "CAST MEMBERS", list.cast);
  table += buildSection("extras", "EXTRAS", list.extras);
  table += buildSection("props", "PROPS", list.props);
  table += buildSection("dressing", "SET DRESSING", list.dressing);
  table += buildSection("makeup", "MAKEUP", list.makeup);
  table += buildSection("vehicles", "VEHICLES", list.vehicles);
  table += buildSection("stunts", "STUNTS", list.stunts);
  table += buildSection("sfx", "SPECIAL EFFECTS", list.sfx);
  table += buildSection("livestock", "LIVESTOCK", list.livestock);
  table += buildSection("handler", "ANIMAL HANDLER", list.handler);
  table += buildSection("music", "MUSIC", list.music);
  table += buildSection("sounds", "SOUNDS", list.sounds);
  return table;
};

const buildList = (breakdown) => {
  const list = {
    cast: [],
    extras: [],
    props: [],
    dressing: [],
    costumes: [],
    makeup: [],
    vehicles: [],
    stunts: [],
    sfx: [],
    livestock: [],
    handler: [],
    music: [],
    sounds: [],
  };
  breakdown.forEach((paragraph) => {
    paragraph.tags.forEach((tag) => {
      switch (tag.element) {
        case "cast":
          list.cast.push(
            tag.snippet.substring(tag.start, tag.finish).trim().toUpperCase()
          );
          break;
        case "extras":
          list.extras.push(
            tag.snippet.substring(tag.start, tag.finish).trim().toUpperCase()
          );
          break;
        case "props":
          list.props.push(
            tag.snippet.substring(tag.start, tag.finish).trim().toUpperCase()
          );
          break;
        case "dressing":
          list.dressing.push(
            tag.snippet.substring(tag.start, tag.finish).trim().toUpperCase()
          );
          break;
        case "costumes":
          list.props.push(tag.snippet.substring(tag.start, tag.finish).trim());
          break;
      }
    });
    list.cast = [...new Set(list.cast)];
    list.extras = [...new Set(list.extras)];
    list.props = [...new Set(list.props)];
    list.dressing = [...new Set(list.dressing)];
    list.costumes = [...new Set(list.costumes)];
    list.makeup = [...new Set(list.makeup)];
    list.vehicles = [...new Set(list.vehicles)];
    list.stunts = [...new Set(list.stunts)];
    list.sfx = [...new Set(list.sfx)];
    list.livestock = [...new Set(list.livestock)];
    list.handler = [...new Set(list.handler)];
    list.music = [...new Set(list.music)];
    list.sounds = [...new Set(list.sounds)];
  });
  return list;
};

const createBreakdown = (scene) => {
  let breakdown = [];
  scene.forEach((s) => {
    breakdown.push({ character: s.character, dialogue: s.dialogue, tags: [] });
  });
  return breakdown;
};

const createBreakdownHTML = (breakdown) => {
  let breakdownHTML = "";
  let index = 0;
  breakdown.forEach((paragraph) => {
    const originalParagraph = paragraph.dialogue;
    paragraph.tags.forEach((tag) => {
      const ptr = originalParagraph.indexOf(tag.snippet);
      if (ptr != -1) {
        const leftString = paragraph.dialogue.substring(
          0,
          ptr + parseInt(tag.start)
        );
        const midString = paragraph.dialogue.substring(
          ptr + parseInt(tag.start),
          ptr + parseInt(tag.finish)
        );
        const rightString = paragraph.dialogue.substring(
          ptr + parseInt(tag.finish)
        );
        paragraph.dialogue = `${leftString}<span class='${tag.element}'>${midString}</span>${rightString}`;
      }
    });
  });

  breakdown.forEach((b) => {
    if (b.character !== "NARRATOR") {
      breakdownHTML += `<p class='character' id='p${index}'>${b.character}</p>`;
      breakdownHTML += `<p class='speech' id='p${index}'>${b.dialogue}</p>`;
      index++;
    } else {
      breakdownHTML += `<p class='action' id='p${index}'>${b.dialogue}</p>`;
      index++;
    }
  });
  return breakdownHTML;
};

const breakdownHandler = async (req, res) => {
  smartLog("info", "ENTERING BREAKDOWN HANDLER");
  const u = url.parse(req.originalUrl, true);
  const title = u.query.title;
  const sceneNumber = u.query.sceneNumber;
  const elementNumber = u.query.elementNumber;
  const element = u.query.element;
  const start = u.query.start;
  const finish = u.query.finish;
  const para = u.query.para;
  const restart = u.query.restart;
  const snippet = u.query.snippet;
  let which = u.query.which;
  const filmFoxFile = await readFile(`${title}/${title}.fff`);
  let { script } = filmFoxFile;

  let breakdown;
  await createDirectory(`${title}/breakdown`);
  let breakdownFileList = await getFileList(`data/${title}/breakdown`, "bkd");
  let bkdFile = "0000" + sceneNumber;
  bkdFile = `${bkdFile.substring(bkdFile.length - 4)}.bkd`;

  if (breakdownFileList.indexOf(bkdFile) === -1 || restart === "yes") {
    breakdown = createBreakdown(script[sceneNumber]);
  } else {
    breakdown = await readFile(`${title}/breakdown/${bkdFile}`);
  }

  if (element) {
    breakdown[para].tags.push({ element, start, finish, snippet });
  }

  await writeFile(JSON.stringify(breakdown), `${title}/breakdown/${bkdFile}`);

  breakdown.forEach((paragraph) => {
    paragraph.tags.sort((a, b) => parseInt(b.start) - parseInt(a.start));
  });

  let breakdownHTML = createBreakdownHTML(breakdown);
  let list = buildList(breakdown);

  const elementsTable = createElementsTable(list, breakdown);

  console.log({which})
  if (!which) which = 'script';

  res.render("breakdown.njk", {
    breakdown: breakdownHTML,
    title,
    sceneNumber,
    elementNumber,
    element,
    start,
    finish,
    para,
    highestScene: script.length - 1,
    list,
    elementsTable,
    which,
  });
};

module.exports = { breakdownHandler };
