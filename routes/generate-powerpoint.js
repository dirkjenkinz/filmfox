const express=require('express');
const router = express.Router();
const {generatePowerpointHandler} = require('../handlers/paperwork/generate-powerpoint-handler');
router.get('/', generatePowerpointHandler);
module.exports = router;