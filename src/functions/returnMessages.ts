import { Response } from 'express'

interface ISuccessMessage {
  response: Response,
  data: object
}

function successMessage ({ response, data }: ISuccessMessage) {
  response.json({
    success: true,
    data: data
  })
}

interface IErrorMessage {
  response: Response,
  code: number,
  message: string
}

function errorMessage ({ response, code, message }: IErrorMessage) {
  response.status(code).json({
    success: false,
    message: message
  })
}

export {
  errorMessage,
  successMessage
}
