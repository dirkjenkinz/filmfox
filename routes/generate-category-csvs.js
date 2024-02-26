const express=require('express');
const router = express.Router();
const {generateCategoryCSVsHandler} = require('../handlers/paperwork/generate-category-csvs-handler');
router.get('/', generateCategoryCSVsHandler);
module.exports = router;