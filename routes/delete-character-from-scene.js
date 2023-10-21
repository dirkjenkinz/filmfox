const express=require('express');
const router = express.Router();
const {deleteCharacterFromSceneHandler} = require('../handlers/delete-character-from-scene-handler');
router.get('/', deleteCharacterFromSceneHandler);
module.exports = router;