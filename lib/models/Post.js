const pool = require('../utils/pool');

module.exports = class Post {
  id;
  userPost;

  constructor(row) {
    this.id = row.id;
    this.userPost = row.user_post;
  }

  static async insert({ userPost }) {
    const { rows } = await pool.query(
      'INSERT INTO posts (user_post) VALUES ($1) RETURNING *',
      [userPost]
    );
    return new Post(rows[0]);
  }
};
