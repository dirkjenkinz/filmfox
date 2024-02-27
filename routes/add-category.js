const express=require('express');
const router = express.Router();
const {addCategoryHandler} = require('../handlers/paperwork/add-category-handler');
router.get('/', addCategoryHandler);
module.exports = router;