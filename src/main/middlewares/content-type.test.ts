import request from 'supertest'
import app from '../config/app'

describe('content type middleware', () => {
  it('Should return as default content type json', async () => {
    const endpoint = '/any_url'

    app.get(endpoint, (_, response) => response.send())

    await request(app)
      .get(endpoint)
      .expect('content-type', /json/)
  })

  it('Should return xml as content type when forced', async () => {
    const endpoint = '/any_url2'

    app.get(endpoint, (_, response) => {
      response.type('xml')
      response.send()
    })

    await request(app)
      .get(endpoint)
      .expect('content-type', /xml/)
  })
})
