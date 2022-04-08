const { Router } = require('express');

module.exports = Router().get('/', (req, res) => {
  res.send([
    {
      author: '1',
      content: '1',
    },
    {
      author: '1',
      content: '1',
    },
    {
      author: '1',
      content: '1',
    },
  ]);
});
