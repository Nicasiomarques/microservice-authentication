import request from 'supertest'
import app from '../app'

describe('Cors middleware', () => {
  it('Ensure cors is enable', async () => {
    const endpoint = '/any_post_url'

    app.get(endpoint, (_, response) => response.send())

    await request(app)
      .get(endpoint)
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
