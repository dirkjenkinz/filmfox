const url = require('url');


const mainHandler = async (req, res) => {
  console.log("entering main handler");

  res.render('main.njk', {});
};

module.exports = { mainHandler };