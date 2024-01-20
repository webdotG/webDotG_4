const express = require('express');
const router = express.Router();
const {AddUser, GetAllUsers, RemoveUser } = require('../models/community')
const Auth = require('../midlewear/auth')

/* api/community/... */

router.post('/', Auth, AddUser);
router.get('/', Auth, GetAllUsers);
router.delete('/:userId', Auth, RemoveUser);


module.exports = router;