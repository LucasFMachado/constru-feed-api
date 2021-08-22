import 'reflect-metadata'
import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { router } from './routes'
import { errorMessage } from './functions/returnMessages'
import './database'

const app = express()

app.use(cors())

app.use(express.json())

app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return errorMessage({
      response: response,
      code: 400,
      message: error.message
    })
  }

  return errorMessage({
    response: response,
    code: 500,
    message: 'Internal server error'
  })
})

app.listen(3000, () => console.log('Server is running'))
