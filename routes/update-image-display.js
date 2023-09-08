const express=require('express');
const router = express.Router();

const {updateImageDisplayHandler} = require('../handlers/update-image-display-handler');

router.get('/', updateImageDisplayHandler);

module.exports = router;