const express=require('express');
const router = express.Router();

const {concatenateHandler} = require('../handlers/concatenate-handler');

router.get('/', concatenateHandler);

module.exports = router;