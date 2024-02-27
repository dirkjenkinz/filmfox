const express=require('express');
const router = express.Router();
const {showGalleryHandler} = require('../handlers/showreel/show-gallery-handler');
router.get('/', showGalleryHandler);
module.exports = router;