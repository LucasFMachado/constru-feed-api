import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UsersRepository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest {
  email: string,
  password: string
}

class SessionsService {
  async authenticate ({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository)

    if (!email || !password) {
      throw new Error('Email/Password incorrect!')
    }

    const user = await usersRepository.findOne({
      email
    })

    if (!user) {
      throw new Error('Email/Password incorrect!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Password incorrect!')
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin
    }

    const token = sign(
      payload,
      '88f332bc8f6556e45e3735d7685f9e93',
      {
        subject: String(user.id),
        expiresIn: '1d'
      }
    )

    return { token }
  }
}

export default SessionsService
