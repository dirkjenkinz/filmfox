const express=require('express');
const router = express.Router();

const {deleteHandler} = require('../handlers/showreel/delete-handler');

router.get('/', deleteHandler);

module.exports = router;