const express=require('express');
const router = express.Router();
const {deleteCategoryHandler} = require('../handlers/delete-category-handler');
router.get('/', deleteCategoryHandler);
module.exports = router;