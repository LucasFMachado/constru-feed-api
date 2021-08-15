import 'reflect-metadata'
import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { router } from './routes'
import './database'

const app = express()

app.use(cors())

app.use(express.json())

app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return response.status(400).json({
      success: false,
      message: error.message
    })
  }

  return response.status(500).json({
    success: false,
    message: 'Internal server error'
  })
})

app.listen(3000, () => console.log('Server is running'))
