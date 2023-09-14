const express=require('express');
const router = express.Router();

const {masterHandler} = require('../handlers/master-handler');

router.get('/', masterHandler);

module.exports = router;