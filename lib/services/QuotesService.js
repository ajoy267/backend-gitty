const fetch = require('cross-fetch');

module.exports = class Quote {
  static getAllQuotes() {
    const arrOfQuotes = [
      'https://programming-quotes-api.herokuapp.com/quotes/random',
      'https://quotes.rest/qod?language=en',
      'https://api.quotable.io/random',
    ];

    const promise = arrOfQuotes.map((item) => fetch(item));

    return Promise.all(promise)
      .then((res) => {
        return Promise.all(res.map((quote) => quote.json()));
      })
      .then((quotesArr) =>
        quotesArr.map((item) => {
          if (item.success) {
            return {
              author: item.contents.quotes[0].author,
              content: item.contents.quotes[0].quote,
            };
          } else if (item.author) {
            return { author: item.author, content: item.content || item.en };
          } else {
            return { author: 'no author', content: 'no content' };
          }
        })
      );
  }
};
