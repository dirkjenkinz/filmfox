const url = require('url');


const displayHandler = async (req, res) => {
  console.log("entering main handler");

  res.render('main.njk', {
    msg: 'Let us not dally',
  });
};

module.exports = { displayHandler };