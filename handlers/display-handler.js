const url = require('url');
const { getData, getListOfElements, getDuration } = require('../services/file-service');
const dotenv = require('dotenv');
dotenv.config();

const formatText = (text) => {
  console.log(text);
  return text;
}

const formatTime = (seconds) => {
  const date = new Date(null);
  date.setSeconds(seconds);
  let h = date.toISOString();
  h = h.substring(11, h.length - 5);
  let micro = (seconds - Math.floor(seconds));
  micro = micro.toString().substring(2,5);
  h = `${h},${micro}`
  return h;
};

const procureDuration = async (file, elementName) => {
  file = file.substring(0, file.length - 4);
  let duration = await getDuration(file, elementName);
  return duration;
};

const displayHandler = async (req, res) => {
  console.log("entering display handler");

  let u = url.parse(req.originalUrl, true);
  let ptr = u.query.ptr;
  let file = u.query.filmFoxFile;
  let filmFoxFile = await getData(file);

  const { title, characters, script } = filmFoxFile;
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
    e = e.substring(0,6);
    elements[index] = parseInt(e);
  });
  
  script.forEach( (s) => {
    s.push('-');
  });

  let timeStart = 0.000;
  let timeFinish = 0.000;
  const elementNames = await getListOfElements(title);
  for (const element of elementNames) {
    const duration = await procureDuration(file, element);
    let num = element.substring(6, 12);
    num = parseInt(num);
    
    timeFinish = timeStart + duration;
    timeFinish = Math.round(timeFinish * 1000) / 1000;


    let formattedStart = '00:00:00,000';
    if (timeStart !== 0){
      formattedStart = formatTime(timeStart);
    };
    
    script[num].push(formattedStart);
    script[num].push(formatTime(duration));
    script[num].push(formatTime(timeFinish));

    timeStart = timeFinish + 0.5;
    timeStart = Math.round(timeStart * 1000) / 1000;
  };

  let srt = '';
  for (let s = 0; s < script.length; s++){
    if (script[s][6]) {
      srt += `${s +1}.\n`;
      srt += `${script[s][6]} ---> ${script[s][8]}\n`;
      srt += `${script[s][0]}: ${script[s][1]}\n` ;
    };
  };
  console.log(srt);

  res.render('display.njk', {
    title,
    api_key,
    script,
    ptr,
    end,
  });
};

module.exports = { displayHandler };