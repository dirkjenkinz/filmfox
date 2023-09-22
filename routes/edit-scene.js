const express=require('express');
const router = express.Router();

const {editSceneHandler} = require('../handlers/edit-scene-handler');

router.get('/', editSceneHandler);

module.exports = router;