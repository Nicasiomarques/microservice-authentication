import request from 'supertest'
import app from '../config/app'

describe('SignUp routes', () => {
  it('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Nicasio Silva',
        email: 'nicasiomarques18@gmail.com',
        password: 'any_password',
        confirmPassword: 'any_password'
      })
      .expect(200)
  })
})
