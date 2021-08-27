import { MongoHelpers } from '../infra/db/mongodb/helpers'
import app from './config/app'
import env from './config/env'

MongoHelpers.connect(env.mongoUrl)
  . then(async () => {
    app.listen(env.port, () => console.log(`Service is running at port ${env.port}`))
  })
  .catch(console.error)
