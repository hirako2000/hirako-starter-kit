'use strict';
const request = require('supertest');
const { app, close } = require('../server');

describe('GET /api/datasets/', () => {
  it('should return all datasets', (done) => {
    request(app).get('/api/datasets/').expect(200).end(done);
  });
});

describe('GET /api/datasets/:id', () => {
  it('should return one dataset', (done) => {
    request(app).get('/api/datasets/123').expect(200).end(done);
  });
});

afterAll(() => {
  close();
});
