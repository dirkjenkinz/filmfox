'use strict';

const { getFileList, writeFile, getFile, getFFFList } = require('../services/file-service');
const { getUserSubscriptionInfo, getVoices } = require('../services/elevenLabs');
const { smartLog } = require('../services/smart-log');

// Handler for rendering the front page
const frontHandler = async (req, res) => {
  // Log entry point for better traceability
  smartLog('info', 'entering front handler');

  // Get the ElevenLabs API key from the environment variables
  const { api_key } = await getFile('control.json');

  // Fetch the list of FFF (Film Fox Files) and FDX (Final Draft) files
  let fffList = await getFFFList();
  const fdxList = await getFileList('scripts', 'fdx');

  // Initialize variables related to ElevenLabs subscription information and voices
  let subscription = '';
  let reset = '';
  let resetDate = '';
  let payment = '';
  let paymentDate = '';
  let voices = '';

  // Check if an ElevenLabs API key is available
  if (api_key) {
    // Fetch user subscription information from ElevenLabs
    subscription = await getUserSubscriptionInfo(api_key);

    if (subscription !== '') {
      subscription = JSON.parse(subscription);

      // Process subscription information for non-free tiers
      if (subscription.tier !== 'free') {
        reset = subscription.next_character_count_reset_unix * 1000;
        resetDate = new Date(reset);
        subscription.next_character_count_reset = resetDate.toLocaleString();
        payment = subscription.next_invoice.next_payment_attempt_unix * 1000;
        paymentDate = new Date(payment);
        subscription.next_invoice.next_payment_attempt = paymentDate.toLocaleString();
      }
    }

    // Fetch available voices from ElevenLabs and save to 'voices.json' file
    voices = await getVoices(api_key);
    await writeFile(JSON.stringify(voices), 'voices.json');
  }

  // Check which FDX files have corresponding FFF files
  const converted = fdxList.map(f => fffList.includes(f.substring(0, f.length - 4)) ? 'y' : 'n');

  // Render the 'front' template with relevant data
  res.render('front.njk', {
    api_key,
    fffList,
    fdxList,
    subscription,
    converted,
  });
};

// Export the frontHandler function for use in other modules
module.exports = { frontHandler };
