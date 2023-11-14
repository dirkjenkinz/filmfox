"use strict";

const dotenv = require("dotenv");
dotenv.config();
const {
  getFileList,
  writeFile,
  getFFFList,
} = require("../services/file-service");
const {
  getUserSubscriptionInfo,
  getVoices,
} = require("../services/elevenLabs");
const { smartLog } = require("../services/smart-log");

const frontHandler = async (req, res) => {
  smartLog("info", "entering front handler");
  const api_key = process.env.APIKEY;
  let fffList = await getFFFList();
  const fdxList = await getFileList("scripts", "fdx");
  let subscription = "";
  if (api_key) {
    let reset = '';
    let resetDate ='';
    let payment = '';
    let paymentDate = '';
    let voices = '';

    subscription = await getUserSubscriptionInfo(api_key);
    if (subscription !== "") {
      subscription = JSON.parse(subscription);
      if (subscription.tier !== "free") {
        reset = subscription.next_character_count_reset_unix * 1000;
        resetDate = new Date(reset);
        subscription.next_character_count_reset = resetDate.toLocaleString();
        payment =
          subscription.next_invoice.next_payment_attempt_unix * 1000;
         paymentDate = new Date(payment);
        subscription.next_invoice.next_payment_attempt =
          paymentDate.toLocaleString();
      }
    }
    voices = await getVoices(api_key);
    await writeFile(JSON.stringify(voices), "voices.json");
  }
  const converted = [];
  fdxList.forEach((f) => {
    if (fffList.indexOf(f.substring(0, f.length - 4)) !== -1){
      converted.push('y');
    } else {
      converted.push('n');
    }
  });

  res.render("front.njk", {
    api_key,
    fffList,
    fdxList,
    subscription,
    converted,
  });
};

module.exports = { frontHandler };
