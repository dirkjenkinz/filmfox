const url = require("url");
const { playSoundFile } = require("../services/file-service");
const dotenv = require("dotenv");
dotenv.config();
const { smartLog } = require("../services/smart-log");

const playMasterHandler = async (req, res) => {
  smartLog("info", "ENTERING PLAY MASTER HANDLER");
  const u = url.parse(req.originalUrl, true);
  const scene = u.query.scene;
  const title = u.query.title;

  playSoundFile(title, "master.mp3", "scenes");
  setTimeout(function () {
    res.redirect(`/merge?title=${title}&scene=${scene}`);
  }, 5000);
};

module.exports = { playMasterHandler };
