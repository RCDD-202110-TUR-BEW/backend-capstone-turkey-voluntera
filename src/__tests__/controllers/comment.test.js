const request = require('supertest');
const { server, db } = require('../../app');

const data = [
  {
    _id: '62013b18541f0fe8cfbe4384',
    sender: 'Ahmet',
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

let id = 0;
describe('connecting,clearing and preloading the database', () => {
  beforeEach(async () => {
    await db.getConnection();
    await db.dropDatabase();
    const response = await request(server)
      .post('/api/project/add')
      .set('Content-Type', 'application/json')
      .send(data[0]);
  });
  afterAll(async () => {
    db.dropDatabase();
    db.closeConnection();
    server.close();
  });

  describe('POST /api/comment/:id', () => {
    test('Should add a comment', async () => {
      const response = await request(server)
        .get('/api/comment/:id')
        .set('Content-Type', 'application/json')
        .send(data[1]);
      // eslint-disable-next-line no-underscore-dangle
      id = response.body[0]._id;
      expect(response.header['content-type']).toContain('application/json');
      expect(response.statusCode).toBe(200);
      expect(response.body.content).toBe(data[1].content);
    });
  });
});
