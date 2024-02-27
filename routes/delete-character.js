const express=require('express');
const router = express.Router();
const {deleteCharacterHandler} = require('../handlers/showreel/delete-character-handler');
router.get('/', deleteCharacterHandler);
module.exports = router;