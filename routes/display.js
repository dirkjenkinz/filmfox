const express=require('express');
const router = express.Router();

const {displayHandler} = require('../handlers/display-handler');

router.get('/', displayHandler);

module.exports = router;