const express=require('express');
const router = express.Router();
const {sceneShotListHandler} = require('../handlers/paperwork/scene-shot-list-handler');
router.get('/', sceneShotListHandler);
module.exports = router;