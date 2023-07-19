const dotenv = require('dotenv');
dotenv.config();
const {getFileList} = require('../services/file-service');

const mainHandler = async (req, res) => {
  console.log("entering main handler");

  const fffList = await getFileList();

  res.render('main.njk', {
    api_key: process.env.APIKEY,
    fffList,
  });
};

module.exports = { mainHandler };