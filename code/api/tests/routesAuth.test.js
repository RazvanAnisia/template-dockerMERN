const request = require('supertest');
const app = require('../server');
const truncateDb = require('../tests/truncateDb');

describe('Auth endpoints', () => {
  it('Should sign up successfully and get an auth token', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        firstName: 'Master2',
        lastName: 'Spider',
        email: 'spider2@gmail.com',
        password: 'lightsaber',
        userName: 'SPider-man'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('Should fail to sign up with the same credentials', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        firstName: 'Master2',
        lastName: 'Spider',
        email: 'spider2@gmail.com',
        password: 'lightsaber',
        userName: 'SPider-man'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('email must be unique');
  });

  beforeAll(async () => {
    await truncateDb();
  });
});
