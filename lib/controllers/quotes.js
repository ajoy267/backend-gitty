const { Router } = require('express');
const Quote = require('../services/QuotesService');

module.exports = Router().get('/', (req, res, next) => {
  Quote.getAllQuotes()
    .then((quotes) => res.send(quotes))
    .catch((error) => next(error));
});
