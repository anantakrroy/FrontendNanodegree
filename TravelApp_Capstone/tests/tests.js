const app = require('../src/server/index.js')
const request = require('supertest')


describe('Other Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})

describe('GET /user', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});