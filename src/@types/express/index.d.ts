/* eslint-disable no-unused-vars */
declare namespace Express {
  export interface Request {
    user_id: number
    user_name: string
    user_email: string
    user_admin: boolean
  }
}
