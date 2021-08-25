import { AccountModel } from '../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../domain/usecases/add-account'

export interface Encrypter {
	encrypt (value: string): Promise<string>
}

class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {
		this.encrypter = encrypter
	}
  async add (account: AddAccountModel): Promise<AccountModel> {
		await this.encrypter.encrypt(account.password)
		return Promise.resolve(null)
	}
}

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
    const {sut, encrypterStub} = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const addAccountData = {
      name: 'any_name',
      password: 'any_password',
      email: 'any_email@email.com'
    }
    sut.add(addAccountData)
    expect(encryptSpy).toHaveBeenCalledWith('any_password')
  })
})
