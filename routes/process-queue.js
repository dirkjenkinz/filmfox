const express=require('express');
const router = express.Router();
const {processQueueHandler} = require('../handlers/process-queue-handler');
router.get('/', processQueueHandler);
module.exports = router;