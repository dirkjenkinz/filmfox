const express=require('express');
const router = express.Router();
const {addCharacterHandler} = require('../handlers/showreel/add-character-handler');
router.get('/', addCharacterHandler);
module.exports = router;