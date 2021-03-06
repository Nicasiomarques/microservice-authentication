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

  it('Should throw if bcrypt.hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => Promise.reject(new Error()))
    const promise = sut.encrypt('plaintext')
    expect(promise).rejects.toThrow()
  })

  it('Should return hashed text if everything is ok', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('plaintext')
    expect(hash).toBe('hash')
  })
})
