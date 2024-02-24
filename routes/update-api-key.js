const express=require('express');
const router = express.Router();
const {updateAPIKeyHandler} = require('../handlers/update-api-key-handler');
router.get('/', updateAPIKeyHandler);
module.exports = router;