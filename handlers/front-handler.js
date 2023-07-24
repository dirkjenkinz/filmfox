const dotenv = require('dotenv');
dotenv.config();
const {getFileList} = require('../services/file-service');
const logger = require('../services/logger');

const frontHandler = async (req, res) => {
  logger.log('info', "entering front handler");

  const fffList = await getFileList('data', 'fff');
  const fdxList = await getFileList('scripts', 'fdx');

  logger.log('info', {fdxList});

  res.render('front.njk', {
    api_key: process.env.APIKEY,
    fffList,
    fdxList,
  });
};

module.exports = { frontHandler };