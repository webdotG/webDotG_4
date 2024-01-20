const express = require('express');
const router = express.Router();
const { GetTags } = require('../models/tag');

router.get('/', GetTags);

module.exports = router;