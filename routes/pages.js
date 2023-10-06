const express=require('express');
const router = express.Router();
const {pagesHandler} = require('../handlers/pages-handler');
router.get('/', pagesHandler);
module.exports = router;