const express = require('express');
const router = express.Router();
const usersCtl = require('../controllers/usersControllers')

router.route('/')
    .get(usersCtl.getAllUsers )
    .post(usersCtl.createNewUser)
    .patch(usersCtl.updateUser)
    .delete(usersCtl.deleteUser)


module.exports = router;