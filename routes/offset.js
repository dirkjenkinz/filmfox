const express=require('express');
const router = express.Router();

const {offsetHandler} = require('../handlers/offset-handler');

router.get('/', offsetHandler);

module.exports = router;