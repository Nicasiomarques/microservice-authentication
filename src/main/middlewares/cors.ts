import { Request, Response, NextFunction } from 'express'

export default (request: Request, response: Response, next: NextFunction) => {
  response.set('access-control-allow-origin', '*')
  response.set('access-control-allow-headers', '*')
  response.set('access-control-allow-methods', '*')
  next()
}