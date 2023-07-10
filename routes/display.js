const express=require('express');
const router = express.Router();

const {displayHandler} = require('../services/handlers/display-handler');

router.get('/', displayHandler);

module.exports = router;