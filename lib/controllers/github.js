const { Router } = require('express');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');
const GithubUser = require('../models/GithubUser');
const jwt = require('jsonwebtoken');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`
    );
  })

  .get('/login/callback', async (req, res, next) => {
    //get code
    const { code } = req.query;
    //exchange code for token
    const token = await exchangeCodeForToken(code);
    //get info from github about user with token
    const { login, avatar_url, email } = await getGithubProfile(token);
    //get existing user if there is one
    let user = await GithubUser.findByUsername(login);
    //if theres no user it creates one
    if (!user) {
      user = await GithubUser.insert({
        username: login,
        avatar: avatar_url,
        email,
      });
    }
    //create jwt
    const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });
    //set cookie and redirect
    try {
      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        })
        .redirect('/api/v1/posts');
      return user;
    } catch (error) {
      next(error);
    }
  })

  .delete('/sessions', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ message: 'Sign out successful' });
  });
