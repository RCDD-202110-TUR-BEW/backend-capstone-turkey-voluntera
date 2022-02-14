const request = require('supertest');
const { server, db } = require('../../app');

const projects = [
  {
    _id: '62013b18541f0fe8cfbe4381',
    email: 'ahmet@example.com',
    username: 'ahmetUser',
    description: 'a description',
    address: 'Istanbul',
  },
];

let id = 0;
describe('connecting,clearing and preloading the database', () => {
  beforeEach(async () => {
    await db.getConnection();
    await db.dropDatabase();
    const response = await request(server)
      .post('/api/profile/add')
      .set('Content-Type', 'application/json')
      .send(projects[0]);
  });
  afterAll(async () => {
    db.dropDatabase();
    db.closeConnection();
    server.close();
  });

  describe('GET /api/profile/filter', () => {
    test('Should filter profiles by username or email', async () => {
      const response = await request(server)
        .get('/api/profile/filter')
        .set('Content-Type', 'application/json')
        .query({ email: 'ahmet@example.com' });
      // eslint-disable-next-line no-underscore-dangle
      id = response.body[0]._id;
      expect(response.header['content-type']).toContain('application/json');
      expect(response.statusCode).toBe(200);
      expect(response.body[0].username).toBe(projects[0].username);
    });
  });
});
