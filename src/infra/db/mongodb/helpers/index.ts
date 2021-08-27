import { MongoClient, Collection } from 'mongodb'

export const MongoHelpers = {
  mongoClient: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.mongoClient = await MongoClient.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  },

  async disconnect (): Promise<void> {
    this.mongoClient.close()
  },

  getCollection (name: string): Collection {
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
