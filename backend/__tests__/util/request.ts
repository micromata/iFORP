import request from 'supertest';
import app from '../../src/app';

export const get = path =>
  request(app)
    .get(path)
    .set('Accept', 'application/json');

export const post = path =>
  request(app)
    .post(path)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

export const put = path =>
  request(app)
    .put(path)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

export const patch = path =>
  request(app)
    .patch(path)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

export const del = path =>
  request(app)
    .delete(path)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
