const express=require('express');
const router = express.Router();
const {createPowerpointHandler} = require('../handlers/paperwork/create-powerpoint-handler');
router.get('/', createPowerpointHandler);
module.exports = router;