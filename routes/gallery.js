const express=require('express');
const router = express.Router();

const {galleryHandler} = require('../handlers/gallery-handler');

router.get('/', galleryHandler);

module.exports = router;