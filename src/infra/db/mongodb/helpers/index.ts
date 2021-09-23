import { MongoClient, Collection } from 'mongodb'

export const MongoHelpers = {
  mongoClient: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.mongoClient = await MongoClient.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  },

  async disconnect (): Promise<void> {
    await this.mongoClient.close()
    this.mongoClient = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.mongoClient?.isConnected) {
      await this.connect(this.uri)
    }
    return this.mongoClient.db().collection(name)
  },

  mapId: (data: any): any => {
    const { _id, ...dataWithoutId } = data.ops[0]
    return {
      ...dataWithoutId,
      id: _id
    }
  }
}
