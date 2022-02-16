const request = require('supertest');
const { server, db } = require('../../app');

const projects = [
  {
    _id: '62013b18541f0fe8cfbe4384',
    sender: 'Ahmet',
    title: 'a title',
    content: 'a small post',
    date: '01/01/2023',
  },
  {
    _id: '62013b18541f0fe8cfbe4383',
    sender: 'Fulya',
    title: 'a second title',
    content: 'an even smaller post',
    date: '01/01/2023',
  },
];

let id = 0;
describe('connecting,clearing and preloading the database', () => {
  beforeEach(async () => {
    await db.getConnection();
    await db.dropDatabase();
    const response = await request(server)
      .post('/api/post/add')
      .set('Content-Type', 'application/json')
      .send(projects[0]);
  });
  afterAll(async () => {
    db.dropDatabase();
    db.closeConnection();
    server.close();
  });

  describe('GET /api/post/filter', () => {
    test.skip('Should filter posts by sender or title', async () => {
      const response = await request(server)
        .get('/api/post/filter')
        .set('Content-Type', 'application/json')
        .query({ sender: 'Ahmet' });
      // eslint-disable-next-line no-underscore-dangle
      id = response.body[0]._id;
      expect(response.header['content-type']).toContain('application/json');
      expect(response.statusCode).toBe(200);
      expect(response.body[0].title).toBe(projects[0].title);
    });
  });

  describe('GET /api/post/app/:id', () => {
    test.skip('Should add a like to the post', async () => {
      const response = await request(server)
        .post(`/api/post/like/${id}`)
        .set('Content-Type', 'application/json');
      expect(response.header['content-type']).toContain(
        'text/html; charset=utf-8'
      );
      expect(response.statusCode).toBe(200);
    });
  });
});
