import { AddAccount } from '../../domain/usecases/add-account'
import { Encrypter } from '../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
	encrypterStub: Encrypter
	sut: AddAccount
}

const makeSut = (): SutTypes => {
	class EncrypterStub {
		encrypt (value: string): Promise<string> {
			return Promise.resolve('password_hashed')
		}
	}
	const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStub)
	return {
		encrypterStub,
		sut
	}
}

describe('DbAddAccount useCase', () => {
  it('Should calls Encrypter.encrypt with correct password', () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const addAccountData = {
      name: 'any_name',
      password: 'any_password',
      email: 'any_email@email.com'
    }
    sut.add(addAccountData)
    expect(encryptSpy).toHaveBeenCalledWith('any_password')
  })

	it('Should throw if encrypter.encrypt throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => Promise.reject(new Error()))
    const addAccountData = {
      name: 'any_name',
      password: 'any_password',
      email: 'any_email@email.com'
    }
    const promise = sut.add(addAccountData)
		await expect(promise).rejects.toThrow()
  })
})
