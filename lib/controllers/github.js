const { Router } = require('express');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

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
  });
