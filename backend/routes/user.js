const express = require('express');
const router = express.Router();
const {Register, Login, Current} = require('../models/user')
const Auth = require('../midlewear/auth')


/* api/user/... */
router.post('/login', Login );
router.post('/register', Register);
router.get('/current', Auth ,Current);

module.exports = router;
