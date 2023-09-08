const express=require('express');
const router = express.Router();

const {scenesHandler} = require('../handlers/scenes-handler');

router.get('/', scenesHandler);

module.exports = router;