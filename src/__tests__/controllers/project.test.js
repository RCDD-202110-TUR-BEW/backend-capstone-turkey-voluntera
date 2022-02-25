const request = require('supertest');
const Database = require('../../db');
const app = require('../../app');
const { Volunteer, Organization } = require('../../models/user');
const Project = require('../../models/project');
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

  describe('GET /api/project/filter', () => {
    test('Should filter projects by location or creator', async () => {
      const organization = await Organization.create(exampleData.organization);
      const project = await Project.create({
        creator: organization._id,
        ...exampleData.project,
      });

      const response = await request(app)
        .get('/api/project/filter')
        .set('Content-Type', 'application/json')
        .query({ address: `${project.address}` });

      expect(response.header['content-type']).toContain('application/json');
      expect(response.statusCode).toBe(200);
      expect(response.body[0].title).toBe(project.title);
    });
  });

  describe('GET /api/project/app/:id', () => {
    test('Should add an applicant to a project', async () => {
      const volunteer = await Volunteer.create(exampleData.volunteer);
      const organization = await Organization.create(exampleData.organization);
      const project = await Project.create({
        creator: organization._id,
        ...exampleData.project,
      });

      const response = await request(app)
        .post(`/api/project/app/${project._id}`)
        .set('Content-Type', 'application/json')
        .send({ applicant: volunteer._id, ...exampleData.application });

      const updatedProject = await Project.findById(project._id);

      expect(response.header['content-type']).toContain('application/json');
      expect(response.statusCode).toBe(200);
      expect(updatedProject.numberOfApplications).toBe(1);
    });
  });
});
