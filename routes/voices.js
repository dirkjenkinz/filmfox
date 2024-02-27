const express=require('express');
const router = express.Router();

const {voicesHandler} = require('../handlers/showreel/voices-handler');

router.get('/', voicesHandler);

module.exports = router;