const express=require('express');
const router = express.Router();

const {showreelHandler} = require('../handlers/showreel/showreel-handler');

router.get('/', showreelHandler);

module.exports = router;