import {
  Encrypter,
  AddAccount,
  DbAddAccount,
  AccountModel,
  AddAccountModel,
  AddAccountRepository
} from './db-add-account-protocols'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    encrypt (value: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }
  return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    add (account: AddAccountModel): Promise<AccountModel> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'eny_email@email.com',
        password: 'hashed_password'
      })
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
  sut: AddAccount
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return {
    addAccountRepositoryStub,
    encrypterStub,
    sut
  }
}

const accountData = {
  name: 'any_name',
  password: 'any_password',
  email: 'any_email@email.com'
}

describe('DbAddAccount useCase', () => {
  it('Should calls Encrypter.encrypt with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('any_password')
  })

  it('Should throw if encrypter.encrypt throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => Promise.reject(new Error()))
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if addAccountRepository.add throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => Promise.reject(new Error()))
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('Should return an account if everything is ok', async () => {
    const { sut } = makeSut()
    const account = await sut.add(accountData)
    expect(account).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'eny_email@email.com',
      password: 'hashed_password'
    })
  })
})
