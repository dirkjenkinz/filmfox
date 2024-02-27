const express=require('express');
const router = express.Router();
const {breakdownHandler} = require('../handlers/paperwork/breakdown-handler');
router.get('/', breakdownHandler);
module.exports = router;