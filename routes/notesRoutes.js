const express = require('express');
const router = express.Router();
const notesCtl = require('../controllers/noteControllers')
const verifyJWT = require('../midleware/verify.JWT')



router.use(verifyJWT)


router.route('/')
    .get(notesCtl.getAllNotes )
    .post(notesCtl.createNewNote)
    .patch(notesCtl.updateNote)
    .delete(notesCtl.deleteNote)


module.exports = router;