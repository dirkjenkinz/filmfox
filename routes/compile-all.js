const express=require('express');
const router = express.Router();
const {compileAllHandler} = require('../handlers/compile-all-handler');
router.get('/', compileAllHandler);
module.exports = router;