import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelpers } from '../helpers'

export class AddAccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelpers.getCollection('accounts')
    const account = MongoHelpers.mapId(await accountCollection.insertOne(accountData))
    return account
  }
}
