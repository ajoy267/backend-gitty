const { Router } = require('express');
const Post = require('../models/Post');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, (req, res, next) => {
    Post.insert(req.body)
      .then((post) => res.send(post))
      .catch((error) => next(error));
  })

  .get('/', authenticate, (req, res, next) => {
    Post.getAllPosts(req.body)
      .then((post) => res.send(post))
      .catch((error) => next(error));
  });
