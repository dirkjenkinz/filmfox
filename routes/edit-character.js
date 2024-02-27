const express=require('express');
const router = express.Router();
const {editCharacterHandler} = require('../handlers/showreel/edit-character-handler');
router.get('/', editCharacterHandler);
module.exports = router;