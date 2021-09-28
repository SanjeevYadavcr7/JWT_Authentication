const express = require('express');
const router = express.Router();
const { getrPrivateData } = require('../controllers/private');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getrPrivateData);

module.exports = router;
