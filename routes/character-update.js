const express=require('express');
const router = express.Router();

const {characterUpdateHandler} = require('../services/handlers/character-update-handler');

router.get('/', characterUpdateHandler);

module.exports = router;