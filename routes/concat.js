const express=require('express');
const router = express.Router();

const {concatHandler} = require('../handlers/concat-handler');

router.get('/', concatHandler);

module.exports = router;