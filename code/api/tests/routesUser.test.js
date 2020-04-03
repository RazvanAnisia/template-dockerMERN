// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');
const app = require('../server');
const truncateDb = require('./truncateDb');

let token;

beforeAll(async done => {
  await truncateDb();

  request(app)
    .post('/signup')
    .send({
      firstName: 'Master2',
      lastName: 'Spider',
      email: 'spider2@gmail.com',
      password: 'lightsaber',
      userName: 'SPider-man'
    })
    .end((_, response) => {
      token = response.body.token;
      done();
    });
});

describe('User endpoints', () => {
  // token not being sent - should respond with a 401
  test('It should require authorization', () => {
    return request(app)
      .get('/user')
      .then(response => {
        expect(response.statusCode).toBe(403);
      });
  });
  // send the token - should respond with a 200
  test('It responds with JSON', () => {
    return request(app)
      .get('/')
      .set('Authorization', `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      });
  });
});
