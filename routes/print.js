const express=require('express');
const router = express.Router();
const {printHandler} = require('../handlers/print-handler');
router.get('/', printHandler);
module.exports = router;