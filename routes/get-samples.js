const express=require('express');
const router = express.Router();

const {getSamplesHandler} = require('../handlers/get-samples-handler');

router.get('/', getSamplesHandler);

module.exports = router;