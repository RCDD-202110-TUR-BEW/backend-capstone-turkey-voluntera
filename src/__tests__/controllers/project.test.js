const request = require('supertest');
const { server, db } = require('../../app');

const projects = [
  {
    _id: '62013b18541f0fe8cfbe4388',
    creator: 'This should be an ObjectID',
    title: 'a title',
    type: 'vol',
    location: 'Istanbul',
    isOpen: 'true',
    date: '01/01/2023',
  },
  {
    title: 'Project 2',
    skills: ['driving license', 'communication'],
    location: 'Bursa',
    Date: new Date('December 18, 2021 03:24:00'),
    isOpen: 'no',
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
      .send(projects[0]);
  });
  afterAll(async () => {
    // await db.dropDatabase();
    db.closeConnection();
    server.close();
  });

  describe('GET /api/project/filter', () => {
    test('Should filter projects by location or creator', async () => {
      const response = await request(server)
        .get('/api/project/filter')
        .set('Content-Type', 'application/json')
        .query({ location: 'Istanbul' });
      // eslint-disable-next-line no-underscore-dangle
      id = response.body[0]._id;
      expect(response.header['content-type']).toContain('application/json');
      expect(response.statusCode).toBe(200);
      expect(response.body[0].title).toBe(projects[0].title);
    });
  });
  describe('GET /api/project/app/:id', () => {
    test('Should add an applicant to a project', async () => {
      const response = await request(server)
        .post(`/api/project/app/${id}`)
        .set('Content-Type', 'application/json')
        .send({
          applicant: 'kishi',
        });
      expect(response.header['content-type']).toContain(
        'text/html; charset=utf-8'
      );
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('your application was successfully passed');
    });
  });
});
