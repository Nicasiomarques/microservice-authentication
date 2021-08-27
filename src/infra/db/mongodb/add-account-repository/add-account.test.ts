import { AddAccount } from '../../../../domain/usecases/add-account'
import { AddAccountMongoRepository } from './add-account'
import { MongoHelpers } from '../helpers'

const makeSut = (): AddAccount => {
  return new AddAccountMongoRepository()
}

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelpers.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelpers.disconnect()
  })

  it('Should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@email.com')
    expect(account.password).toBe('any_password')
  })
})
