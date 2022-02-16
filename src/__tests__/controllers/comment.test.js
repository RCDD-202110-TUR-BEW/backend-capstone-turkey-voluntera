const request = require('supertest');
const Database = require('../../db');
const app = require('../../app');

const db = new Database(process.env.DB_TEST_URL);

jest.setTimeout(30000);
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const data = [
  {
    _id: '62013b18541f0fe8cfbe4384',
    sender: '62013b18541f0fe8cfbe4384',
    title: 'a title',
    content: 'a small post',
    date: '01/01/2023',
  },
  {
    sender: 'Hulya',
    content: 'a comment content',
    Date: '01/01/2023',
  },
];

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
      const newPost = await request(app)
        .post(`/api/post/add`)
        .set('Content-Type', 'application/json')
        .send(data[0]);

      const response = await request(app)
        .post(`/api/comment/${newPost._id}`)
        .set('Content-Type', 'application/json')
        .send(data[1]);

      // expect(response.header['content-type']).toContain('application/json');
      expect(response.statusCode).toBe(200);
      expect(response.body.content).toBe(data[1].content);
    });
  });
});
