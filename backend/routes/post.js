const express = require('express');
const router = express.Router();
const {GetAll, GetOne, Create, Remove, Update} = require('../models/post')
const Auth = require('../midlewear/auth')


/* api/posts/... */
router.get('/', GetAll);
router.get('/:id', GetOne);
router.post('/',Auth, Create)
router.delete('/:id', Auth, Remove)
router.patch('/:id', Auth, Update)


module.exports = router;
