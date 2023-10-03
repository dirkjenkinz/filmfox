const express=require('express');
const router = express.Router();
const {editShotListHandler} = require('../handlers/edit-shot-list-handler');
router.get('/', editShotListHandler);
module.exports = router;