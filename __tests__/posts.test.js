const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-gitty post routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should allow signed in users to create a post', async () => {
    const agent = request.agent(app);
    const res = await agent
      .post('/api/v1/posts')
      .send({ userPost: 'Hope this works' });
    expect(res.body).toEqual({
      id: expect.any(String),
      userPost: 'Hope this works',
    });
  });
});
