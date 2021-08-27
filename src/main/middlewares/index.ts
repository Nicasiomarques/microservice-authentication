import { Express } from 'express'

import { contentType } from './content-type'
import { bodyParser } from './body-parser'
import { cors } from './cors'

export default (app: Express): void => {
  app.use(contentType)
  app.use(bodyParser)
  app.use(cors)
}
