const express = require('express');
const router = express.Router();
const usersCtl = require('../controllers/usersControllers')
const verifyJWT = require('../midleware/verify.JWT')





router.route('/create')
    .post(usersCtl.createNewUser)



router.use(verifyJWT)

router.route('/')
    .get(usersCtl.getAllUsers )
    .patch(usersCtl.updateUser)
    .delete(usersCtl.deleteUser)


module.exports = router;