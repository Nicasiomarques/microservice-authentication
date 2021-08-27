import express from 'express'
import setupMiddlewares from './middleware-setup'

const app = express()
setupMiddlewares(app)

export default app
