const url = require("url");
const { smartLog } = require("../services/smart-log");
const { getData, getFileList } = require("../services/file-service");

const voicesHandler = async (req, res) => {
  smartLog("info", "ENTERING VOICES HANDLER");
  const u = url.parse(req.originalUrl, true);

  let voices = await getData("voices.json");

  let generated = await getFileList("data/samples", "mp3");

  const gen = [];
  voices.forEach((v) => {
  if (generated.indexOf(`${v.voice_id}.mp3`) > -1) {
    gen.push("yes");
  } else {
    gen.push("no");
  };
});

  let vox = [];
  voices.forEach((v, index) => {
    vox.push({
      id: v.voice_id,
      name: v.name,
      accent: v.labels.accent,
      description: v.labels.description,
      age: v.labels.age,
      gender: v.labels.gender,
      preview: v.preview_url,
      downloaded: "no",
      generated: gen[index],
    });
  });

  res.render("voices.njk", {
    vox,
  });
};

module.exports = { voicesHandler };
