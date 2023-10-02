const express=require('express');
const router = express.Router();
const {backToScenesHandler} = require('../handlers/back-to-scenes-handler');
router.get('/', backToScenesHandler);
module.exports = router;