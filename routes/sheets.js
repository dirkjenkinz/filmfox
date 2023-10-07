const express=require('express');
const router = express.Router();
const {sheetsHandler} = require('../handlers/sheets-handler');
router.get('/', sheetsHandler);
module.exports = router;