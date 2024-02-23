const express=require('express');
const router = express.Router();
const {deleteImageHandler} = require('../handlers/delete-image-handler');
router.get('/', deleteImageHandler);
module.exports = router;