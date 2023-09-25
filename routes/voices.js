const express=require('express');
const router = express.Router();

const {voicesHandler} = require('../handlers/voices-handler');

router.get('/', voicesHandler);

module.exports = router;