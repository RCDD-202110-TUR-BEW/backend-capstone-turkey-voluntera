const request = require('supertest');
const Database = require('../../db');
const app = require('../../app');
const Post = require('../../models/post');
const { Volunteer } = require('../../models/user');
const exampleData = require('./exampleData.json');

const db = new Database(process.env.DB_TEST_URL);

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
describe('connecting,clearing and preloading the database', () => {
  beforeAll(async () => {
    await db.getConnection();
    await db.dropDatabase();
  });

  beforeEach(async () => {
    await db.dropDatabase();
  });

  afterAll(async () => {
    await db.dropDatabase();
    db.closeConnection();
  });

  describe('GET /api/posts/filter', () => {
    test('Should filter posts by sender or title', async () => {
      const volunteer = await Volunteer.create(exampleData.volunteer);
      const post = await Post.create({
        sender: volunteer._id,
        ...exampleData.post,
      });

      const response = await request(app)
        .get('/api/posts/filter')
        .set('Content-Type', 'application/json')
        .query({ sender: post.sender.toString() });

      expect(response.header['content-type']).toContain('application/json');
      expect(response.statusCode).toBe(200);
      expect(response.body[0]._id).toBe(post._id.toString());
    });
  });

  describe('POST /api/posts/app/:id', () => {
    test('Should add a like to the post', async () => {
      const volunteer = await Volunteer.create(exampleData.volunteer);
      const post = await Post.create({
        sender: volunteer._id,
        ...exampleData.post,
      });

      const response = await request(app)
        .post(`/api/posts/like/${post._id}`)
        .set('Content-Type', 'application/json')
        .send({ userId: `${volunteer._id}` });

      const updatedPost = await Post.findById(post._id);

      expect(response.header['content-type']).toContain('application/json');
      expect(response.statusCode).toBe(200);
      expect(updatedPost.numberOfLikes).toBe(1);
    });
  });
});
