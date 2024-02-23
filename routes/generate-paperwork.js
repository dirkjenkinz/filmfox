const express=require('express');
const router = express.Router();
const {generatePaperworkHandler} = require('../handlers/paperwork/generate-paperwork-handler');
router.get('/', generatePaperworkHandler);
module.exports = router;