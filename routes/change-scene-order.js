const express=require('express');
const router = express.Router();
const {changeSceneOrderHandler} = require('../handlers/change-scene-order-handler');
router.get('/', changeSceneOrderHandler);
module.exports = router;