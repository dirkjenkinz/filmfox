const express=require('express');
const router = express.Router();
const {breakdownReportHandler} = require('../handlers/paperwork/breakdown-report-handler');
router.get('/', breakdownReportHandler);
module.exports = router;