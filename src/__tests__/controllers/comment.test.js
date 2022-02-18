const request = require('supertest');
const Database = require('../../db');
const app = require('../../app');
const Post = require('../../models/post');
const { User, Volunteer, Organization } = require('../../models/user');
const Project = require('../../models/project');
const exampleData = require('./exampleData.json');

const db = new Database(process.env.DB_TEST_URL);

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
describe('connecting,clearing and preloading the database', () => {
  beforeAll(async () => {
    try {
      await db.getConnection();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await db.dropDatabase();
    } catch (err) {
      console.log(err);
    }
  });

  afterAll(async () => {
    try {
      await db.dropDatabase();
      await db.closeConnection();
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /api/comment/:id', () => {
    test('Should add a comment', async () => {
      const volunteer = await Volunteer.create(exampleData.volunteer);
      const post = await Post.create({
        sender: volunteer._id,
        ...exampleData.post,
      });
      const response = await request(app)
        .post(`/api/comment/comment/${post._id}`)
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
