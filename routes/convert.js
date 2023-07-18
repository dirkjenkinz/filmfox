const express=require('express');
const router = express.Router();

const {convertHandler} = require('../handlers/convert-handler');

router.get('/', convertHandler);

module.exports = router;