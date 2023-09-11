const express=require('express');
const router = express.Router();

const {mergeHandler} = require('../handlers/merge-handler');

router.get('/', mergeHandler);

module.exports = router;