const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  it('debería responder con saludo', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('¡Hola desde Node.js!');
    expect(res.statusCode).toBe(200);
  });
});
