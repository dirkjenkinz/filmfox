const express=require('express');
const router = express.Router();
const {updateCreditsHandler} = require('../handlers/update-credits-handler');
router.get('/', updateCreditsHandler);
module.exports = router;