import request from 'supertest'
import { MongoHelpers } from '../../infra/db/mongodb/helpers'
import app from '../config/app'

describe('SignUp routes', () => {
  beforeAll(async () => {
    await MongoHelpers.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelpers.disconnect()
  })

  beforeEach(async () => {
    (await MongoHelpers.getCollection('accounts')).deleteMany({})
  })

  it('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Nicasio Silva',
        email: 'nicasiomarques18@gmail.com',
        password: 'any_password',
        passwordConfirm: 'any_password'
      })
      .expect(200)
  })
})
