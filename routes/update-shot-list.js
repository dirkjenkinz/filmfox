const express=require('express');
const router = express.Router();
const {updateShotListHandler} = require('../handlers/paperwork/update-shot-list-handler');
router.get('/', updateShotListHandler);
module.exports = router;