const express=require('express');
const router = express.Router();
const {updateCreditsHandler} = require('../handlers/showreel/update-credits-handler');
router.get('/', updateCreditsHandler);
module.exports = router;