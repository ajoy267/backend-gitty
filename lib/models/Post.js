const pool = require('../utils/pool');

module.exports = class Post {
  id;
  userPost;

  constructor(row) {
    this.id = row.id;
    this.userPost = row.user_post;
  }

  static insert({ userPost }) {
    return pool
      .query('INSERT INTO posts (user_post) VALUES ($1) RETURNING *', [
        userPost,
      ])
      .then(({ rows }) => new Post(rows[0]));
  }

  static getAllPosts() {
    return pool
      .query('SELECT * FROM posts')
      .then(({ rows }) => rows.map((row) => new Post(row)));
  }
};
