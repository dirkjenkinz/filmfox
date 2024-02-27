const express=require('express');
const router = express.Router();
const {changeSceneOrderHandler} = require('../handlers/paperwork/change-scene-order-handler');
router.get('/', changeSceneOrderHandler);
module.exports = router;