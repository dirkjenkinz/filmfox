const express=require('express');
const router = express.Router();
const {sheetsHandler} = require('../handlers/paperwork/sheets-handler');
router.get('/', sheetsHandler);
module.exports = router;