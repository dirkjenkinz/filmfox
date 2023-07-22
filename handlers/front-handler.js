const dotenv = require('dotenv');
dotenv.config();
const {getFileList} = require('../services/file-service');

const frontHandler = async (req, res) => {
  console.log("entering front handler");

  const fffList = await getFileList('data', 'fff');
  const fdxList = await getFileList('scripts', 'fdx');

  console.log({fdxList});

  res.render('front.njk', {
    api_key: process.env.APIKEY,
    fffList,
    fdxList,
  });
};

module.exports = { frontHandler };