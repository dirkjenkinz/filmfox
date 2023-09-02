const express=require('express');
const router = express.Router();

const {updateImageHandler} = require('../handlers/update-image-handler');

router.get('/', updateImageHandler);

module.exports = router;