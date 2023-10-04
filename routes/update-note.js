const express=require('express');
const router = express.Router();
const {updateNoteHandler} = require('../handlers/update-note-handler');
router.get('/', updateNoteHandler);
module.exports = router;