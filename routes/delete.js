const express=require('express');
const router = express.Router();

const {deleteHandler} = require('../handlers/delete-handler');

router.get('/', deleteHandler);

module.exports = router;