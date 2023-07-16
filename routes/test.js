const express=require('express');
const router = express.Router();

const {testHandler} = require('../services/handlers/test-handler');

router.get('/', testHandler);

module.exports = router;