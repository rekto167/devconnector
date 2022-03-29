const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const{check, validationResult} = require('express-validator')

const User = require('../../models/User')
const Post = require('../../models/Posts')

// @router  POST api/posts
// @desc    Create post
// @access  Private
router.post('/', [auth,[
    check('text', 'Text is required').not().isEmpty(),
]],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        let user = await User.findById(req.user.id);
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save();

        res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @router  POST api/posts
// @desc    Get all profile
// @access  Private
router.get('/', auth, async(req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @router  GET api/posts/:id_post
// @desc    Get posts by id
// @access  Private
router.get('/:id_post', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id_post);
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @router  DELETE api/posts/:id_post
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized to delete'});
        }

        await post.remove();
        res.json({msg: 'Post was deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server erorr');
    }
})

// @router  PUT api/posts/like/:id_post
// @desc    Liked
// @access  Private
router.put('/like/:id_post', auth, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id_post);
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg:'Post already liked'});
        }

        post.likes.unshift({user: req.user.id});

        await post.save();
        res.send(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})


module.exports = router;