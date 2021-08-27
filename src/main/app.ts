import express from 'express'
import setupMiddlewares from './middlewares/setup-middlewares'

const app = express()
setupMiddlewares(app)

export default app
