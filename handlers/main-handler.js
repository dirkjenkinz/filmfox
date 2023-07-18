const dotenv = require('dotenv');
dotenv.config();

const mainHandler = async (req, res) => {
  console.log("entering main handler");

  res.render('main.njk', {
    api_key: process.env.APIKEY,
  });
};

module.exports = { mainHandler };