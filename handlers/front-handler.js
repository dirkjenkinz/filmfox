const dotenv = require('dotenv');
dotenv.config();
const { getFileList, writeFile } = require('../services/file-service');
const { getUserSubscriptionInfo, getVoices } = require('../services/elevenLabs');
const { smartLog } = require('../services/smart-log');

const frontHandler = async (req, res) => {
  smartLog('info', 'entering front handler');
  const api_key = process.env.APIKEY;
  const fffList = await getFileList('data', 'fff');
  const fdxList = await getFileList('scripts', 'fdx');
  let subscription = await getUserSubscriptionInfo(api_key);
  subscription = JSON.parse(subscription);
  let reset = subscription.next_character_count_reset_unix * 1000;
  const resetDate = new Date(reset);
  subscription.next_character_count_reset = resetDate.toLocaleString();
  let payment = subscription.next_invoice.next_payment_attempt_unix * 1000;
  const paymentDate = new Date(payment);
  subscription.next_invoice.next_payment_attempt = paymentDate.toLocaleString();

  const voices = await getVoices(api_key);
  await writeFile(JSON.stringify(voices), 'voices.json');

  res.render('front.njk', {
    api_key,
    fffList,
    fdxList,
    subscription,
  });
};

module.exports = { frontHandler };