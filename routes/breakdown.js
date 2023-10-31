const express=require('express');
const router = express.Router();
const {breakdownHandler} = require('../handlers/breakdown-handler');
router.get('/', breakdownHandler);
module.exports = router;