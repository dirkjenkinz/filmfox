const express=require('express');
const router = express.Router();
const {categoriesHandler} = require('../handlers/categories-handler');
router.get('/', categoriesHandler);
module.exports = router;