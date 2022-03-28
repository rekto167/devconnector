const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')

const User = require('../../models/User')

// @router  GET api/auth
// @desc    Test Route
// @access  Public
router.get('/', auth, (req, res) => {
    res.send('Auth route');
})

// @router  POST api/auth
// @desc    Authentication user & get Token
// @access  Public
router.post('/', [
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body

    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({msg: 'Invalid credentials'})
        }

        const payload = {
            user:{
                id: user.id,
            }
        }

        jwt.sign(
            payload,
            config.get('jwtToken'),
            {expiresIn: 360000},
            (err, token) => {
                if(err) throw err;
                res.json({token});
            }
        )
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

module.exports = router;