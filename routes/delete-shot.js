const express=require('express');
const router = express.Router();
const {deleteShotHandler} = require('../handlers/delete-shot-handler');
router.get('/', deleteShotHandler);
module.exports = router;