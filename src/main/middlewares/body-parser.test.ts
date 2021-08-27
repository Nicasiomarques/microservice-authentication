import request from 'supertest'
import app from '../config/app'

describe('bodyParser middleware', () => {
  it('should parse payload as json correctly', async () => {
    const payload = { name: 'any_name' }
    const endpoint = '/any_post_url'

    app.post(endpoint, (request, response) =>
      response.send(request.body)
    )

    await request(app)
      .post(endpoint)
      .send(payload)
      .expect(payload)
  })
})
