import express from 'express'

import setupRoutes from './routes'
import setupMiddlewares from './middleware-setup'

const app = express()
setupMiddlewares(app)
setupRoutes(app)

export default app
