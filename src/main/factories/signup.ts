import { DbAddAccount } from '../../data/usecases/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AddAccountMongoRepository } from '../../infra/db/mongodb/add-account-repository/add-account'
import { SignUpController } from '../../presentation/controller/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpController = () => {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter(salt)
  const addAccountMongoRepository = new AddAccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, addAccountMongoRepository)
  return new SignUpController(emailValidator, addAccount)
}
