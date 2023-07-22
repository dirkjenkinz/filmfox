const url = require('url');

const dotenv = require('dotenv');
dotenv.config();
const { getData, getListOfElements, getDuration } = require('../services/file-service');

const procureDuration = async (file, elementName) => {
  let duration = await getDuration(file, elementName);
  return duration;
};

const formatTime = (seconds) => {
  const date = new Date(null);
  date.setSeconds(seconds);
  const h = date.toISOString();
  return h;
};

const srtHandler = async (req, res) => {
  console.log("entering srt handler");
  let u = url.parse(req.originalUrl, true);
  let ptr = u.query.ptr;
  let file = u.query.filmFoxFile;
  let fff = await getData(`${file}.fff`);

  let { title, characters, script } = fff;
  const api_key = process.env.APIKEY;

  script.forEach(scriptChar => {
    characters.forEach(c => {
      if (c[0] === scriptChar[0]) {
        scriptChar[3] = c[1];
      };
    })
  });

  ptr = parseInt(ptr);
  const end = script.length - 10;
  if (ptr > end) ptr = end;
  if (ptr < 0) ptr = 0;

  const elements = await getListOfElements(title);
  elements.forEach((e, index) => {
    e = e.substring(6);
    e = e.substring(0, 6);
    elements[index] = parseInt(e);
  });

  script.forEach((s) => {
    s.push('-');
  });

  const elementNames = await getListOfElements(title);

for(const num of elements) {
    const duration = await procureDuration(file, elementNames[num]);
    script[num].push(duration);
    script[num][4] = elementNames[num];
  };


  let srt = [];
  let startTime = 0;
  let endTime = 0;

  script.forEach((s, index) => {
    startTime = endTime;
    const st = formatTime(startTime);
    const et = formatTime(endTime);
    item = [];
    item.push(index + 1);
    item.push(st);
    item.push(et);
    item.push(s[0]);
    item.push(s[1]);
    srt.push(item);
  });

  console.log('---------')
  console.log(script[0]);
  console.log('---------')

  res.render('display.njk', {
    title,
    api_key,
    script,
    ptr,
    end,
  });
};

module.exports = { srtHandler };