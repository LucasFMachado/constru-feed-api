import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UsersRepository'
import { hash } from 'bcryptjs'
import { classToPlain } from 'class-transformer'

interface ICreateUsersRequest {
  name: string,
  email: string,
  password: string,
  admin: boolean
}

interface IUpdateUsersRequest {
  id: number,
  name: string,
  email: string,
  password: string,
  blocked: boolean,
  active: boolean,
  admin: boolean
}

interface IDeleteUsersRequest {
  id: number
}

class UsersService {
  async create ({ name, email, password, admin }: ICreateUsersRequest) {
    const usersRepository = getCustomRepository(UsersRepository)

    if (!email) {
      throw new Error('Email incorrect!')
    }

    const userAlreadyExists = await usersRepository.findOne({
      email
    })

    if (userAlreadyExists) {
      throw new Error('User already exists!')
    }

    const passwordHash = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin
    })

    await usersRepository.save(user)

    return classToPlain(user)
  }

  async update ({ id, name, email, password, blocked, active, admin }: IUpdateUsersRequest) {
    const usersRepository = getCustomRepository(UsersRepository)

    if (!id) {
      throw new Error('User incorrect!')
    }

    if (!name) {
      throw new Error('Name incorrect!')
    }

    const user = await usersRepository.findOne({ id })

    if (!user) {
      throw new Error('User does not exists!')
    }

    const passwordHash = await hash(password, 8)

    const newUser = {
      ...user,
      name,
      email,
      password: passwordHash,
      blocked,
      active,
      admin
    }

    usersRepository.update(id, newUser)

    await usersRepository.save(newUser)

    return classToPlain(newUser)
  }

  async delete ({ id }: IDeleteUsersRequest) {
    const usersRepository = getCustomRepository(UsersRepository)

    if (!id) {
      throw new Error('User incorrect!')
    }

    const user = await usersRepository.findOne({ id })

    if (!user) {
      throw new Error('User does not exists!')
    }

    const deletedUser = {
      ...user,
      deleted: true
    }

    usersRepository.update(id, deletedUser)

    await usersRepository.save(deletedUser)

    return classToPlain(deletedUser)
  }
}

export default UsersService
