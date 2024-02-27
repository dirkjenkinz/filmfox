const express=require('express');
const router = express.Router();

const {updateImageDisplayHandler} = require('../handlers/showreel/update-image-display-handler');

router.get('/', updateImageDisplayHandler);

module.exports = router;