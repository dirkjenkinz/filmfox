const express=require('express');
const router = express.Router();

const {generateSingleHandler} = require('../services/handlers/generate-single-handler');

router.get('/', generateSingleHandler);

module.exports = router;