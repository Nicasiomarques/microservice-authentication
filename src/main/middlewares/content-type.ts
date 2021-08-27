import { NextFunction, Request, Response } from 'express'

export const contentType = (_: Request, response: Response, next: NextFunction) => {
  response.type('json')
  next()
}
