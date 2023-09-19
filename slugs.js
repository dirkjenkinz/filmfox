const fs = require("fs");
const { createCanvas } = require("canvas");
const { getData } = require("./services/file-service");

const createCard = (width, height, title, scene, slugLine) => {
    let num = '00000' + scene;
    num = num.substring(num.length - 5);
    
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "BLACK";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "WHITE";
  ctx.fillRect(10, 10, 380, 205);
  ctx.fillStyle = "BLACK";
  ctx.font = "12px Courier";
  ctx.fillText(title, 20, 35);
  ctx.fillText(`Scene ${scene}`, 20, 90);
  ctx.fillText(slugLine, 20, 120);

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(`./slugs/slug${num}.png`, buffer);
};

const build = async () => {
  const file = await getData("Satellite/Satellite.fff");
  const { script } = file;

  let index = 1;
  script.forEach((s) => {
    if (s[0] === 'NARRATOR'){
        if (s[1].substring(0,3) === 'INT' || s[1].substring(0,3) === 'EXT'){
        createCard(400, 225, "Satellite", index, s[1]);
        index++;
        };
    }
  })


  // createCard(400, 225, "Satellite", 26, 'INT. HALLWAY - NIGHT - CONTINUOUS');
};

build();
