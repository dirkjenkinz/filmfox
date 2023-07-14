const express=require('express');
const router = express.Router();

const {convertHandler} = require('../services/handlers/convert-handler');

router.get('/', convertHandler);

module.exports = router;