const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @router  GET api/auth
// @desc    Test Route
// @access  Public
router.get('/', auth, (req, res) => {
    res.send('Auth route');
})

module.exports = router;