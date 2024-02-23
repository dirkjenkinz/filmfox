const express=require('express');
const router = express.Router();
const {renderBreakdownHandler} = require('../handlers/render-breakdown-handler');
router.get('/', renderBreakdownHandler);
module.exports = router;