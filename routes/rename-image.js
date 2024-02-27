const express=require('express');
const router = express.Router();
const {renameImageHandler} = require('../handlers/showreel/rename-image-handler');
router.get('/', renameImageHandler);
module.exports = router;