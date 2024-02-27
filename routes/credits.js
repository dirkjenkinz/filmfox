const express=require('express');
const router = express.Router();
const {creditsHandler} = require('../handlers/showreel/credits-handler');
router.get('/', creditsHandler);
module.exports = router;