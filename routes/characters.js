const express=require('express');
const router = express.Router();

const {charactersHandler} = require('../handlers/characters-handler');

router.get('/', charactersHandler);

module.exports = router;