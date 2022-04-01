const { Router } = require('express');
const Post = require('../models/Post');

module.exports = Router().post('/', async (req, res) => {
  const post = await Post.insert(req.body);
  res.send(post);
});
