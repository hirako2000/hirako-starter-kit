'use strict';
const request = require('supertest');
const { app } = require('../server');

describe('GET /api/datasets/', () => {
  it('should return all datasets', () => {
    request(app)
      .get('/api/datasets/')
      .expect(200);
  });
});

describe('GET /api/datasets/:id', () => {
  it('should return one dataset', () => {
    request(app)
      .get('/api/datasets/123')
      .expect(200);
  });
});
