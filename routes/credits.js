const express=require('express');
const router = express.Router();
const {creditsHandler} = require('../handlers/credits-handler');
router.get('/', creditsHandler);
module.exports = router;