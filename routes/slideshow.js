const express=require('express');
const router = express.Router();
const {slideshowHandler} = require('../handlers/slideshow-handler');
router.get('/', slideshowHandler);
module.exports = router;