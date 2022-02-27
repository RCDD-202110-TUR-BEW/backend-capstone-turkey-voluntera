const request = require('supertest');
const Database = require('../../db');
const app = require('../../app');
const Post = require('../../models/post');
const { Volunteer } = require('../../models/user');
const exampleData = require('./exampleData.json');

const db = new Database(process.env.DB_TEST_URL);

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
    await db.closeConnection();
  });

  describe('POST /api/comments/:id', () => {
    test('Should add a comment', async () => {
      const volunteer = await Volunteer.create(exampleData.volunteer);
      const post = await Post.create({
        sender: volunteer._id,
        ...exampleData.post,
      });

      const response = await request(app)
        .post(`/api/comments/${post._id}`)
        .set('Content-Type', 'application/json')
        .send({ sender: volunteer._id, ...exampleData.comment });

      expect(response.header['content-type']).toContain('application/json');
      expect(response.statusCode).toBe(200);
      expect(response.body.comments[0].content).toBe(
        exampleData.comment.content
      );
    });
  });
});
