const express=require('express');
const router = express.Router();

const {characterUpdateHandler} = require('../handlers/character-update-handler');

router.get('/', characterUpdateHandler);

module.exports = router;