import { AccountModel, Encrypter, AddAccountModel, AddAccount } from "./db-add-account-protocols"
export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {
		this.encrypter = encrypter
	}
  async add (account: AddAccountModel): Promise<AccountModel> {
		await this.encrypter.encrypt(account.password)
		return Promise.resolve(null)
	}
}
