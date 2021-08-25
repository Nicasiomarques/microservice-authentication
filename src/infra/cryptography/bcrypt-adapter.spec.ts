import bcrypt from 'bcrypt'

import { Encrypter } from '../../data/protocols/encrypter'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hash')
  }
}))

const salt = 12
const makeSut = (): Encrypter => {
  return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
  it('Should calls bcrypt.hash with correct password', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('plaintext')
    expect(hashSpy).toHaveBeenCalledWith('plaintext', salt)
  })
})
