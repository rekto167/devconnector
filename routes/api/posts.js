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

// @router  PUT api/posts/unlike/:id_post
// @desc    Unlike
// @access  Private
router.put('/unlike/:id_post', auth, async (req, res) => {
    try {
        let post = await Post.findById(req.params.id_post);
        if(post.likes.filter(like => like.user.toString() === req.user.id).length < 0){
            return res.status(400).json({msg:'Post has not yet liked'});
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();
        res.send(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @router  PUT api/posts/comment/:id_post
// @desc    Add comment
// @access  Private
router.put('/comment/:id_post', [auth,
    [
        check('text', 'Text is required').not().isEmpty()
    ]
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({errors: errors.array()});
    }

    try {
        let post = await Post.findById(req.params.id_post);

        const user = await User.findById(req.user.id).select('-password');

        const newComment = {
            user: user.id,
            text: req.body.text,
            avatar: user.avatar,
        }

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @router  DELETE api/posts/comment/:id_post/:id_comment
// @desc    Delete comment
// @access  Private
router.delete('/comment/:id_post/:id_comment', auth, async (req, res) => {
    let post = await Post.findById(req.params.id_post);

    const comment = post.comments.find(comment => comment.id === req.params.id_comment);

    if(!comment) {
        return res.status(404).json({msg: 'Comment does not exist'});
    }

    if(comment.user.toString() !== req.user.id){
        return res.status(401).json({msg: 'Not authorized for this comment'});
    }

    const removeIndex = post.comments.map( comment => comment.user.toString()).indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json({msg: 'Comment deleted'});
})

module.exports = router;