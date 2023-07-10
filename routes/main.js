const express=require('express');
const router = express.Router();

const {mainHandler} = require('../services/handlers/main-handler');

router.get('/', mainHandler);

module.exports = router;