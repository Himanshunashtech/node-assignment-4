const request = require('supertest');
const app = require('../app');

describe('User Controller', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('User created successfully');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
  });
});
