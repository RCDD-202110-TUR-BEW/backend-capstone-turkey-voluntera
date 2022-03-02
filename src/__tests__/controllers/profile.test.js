const request = require('supertest');
const Database = require('../../db');
const app = require('../../app');
const { Volunteer } = require('../../models/user');
const exampleData = require('./exampleData.json');

const db = new Database(process.env.DB_TEST_URL);

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
describe('profile controller', () => {
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

  describe('GET /api/profiles/filter', () => {
    test('Should filter profiles by username or email', async () => {
      const user = await Volunteer.create(exampleData.volunteer);

      const response = await request(app)
        .get('/api/profiles/filter')
        .set('Content-Type', 'application/json')
        .query({ email: user.email });

      expect(response.header['content-type']).toContain('application/json');
      expect(response.statusCode).toBe(200);
      expect(response.body[0]._id).toMatch(user._id.toString());
    });
  });

  describe('GET /api/profiles/:id', () => {
    test('Should return the element with given id', async () => {
      const user = await Volunteer.create(exampleData.volunteer);

      const response = await request(app)
        .get(`/api/profiles/${user._id.toString()}`)
        .set('Content-Type', 'application/json');

      expect(response.statusCode).toBe(200);
      expect(response.body._id).toBe(user._id.toString());
    });
  });
});
