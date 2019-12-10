var express = require('express');
var router = express.Router();

const {registerController, loginController, recoveryController} = require('../controllers/auth.js')

/* GET users listing. */
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/recovery', recoveryController);

module.exports = router;
