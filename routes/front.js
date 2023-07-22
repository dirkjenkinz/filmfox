const express=require('express');
const router = express.Router();

const {frontHandler} = require('../handlers/front-handler');

router.get('/', frontHandler);

module.exports = router;