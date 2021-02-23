import { Vote } from './../generated/resolvers-types'
import { Client, CollectionConfig, PrivateKey, ThreadID } from '@textile/hub'

export default class Textile {
  async deleteVote(id: string): Promise<string> {
    await this.client.delete(this.threadId, 'Vote', [id])
    return id
  }
  async createVote(NFT: string): Promise<Vote> {
    const vote: Vote = { _id: '', NFT }
    const ids = await this.client.create(this.threadId, 'Vote', [vote])
    vote._id = ids[0]
    return vote
  }
  async get<T>(collectionName: string): Promise<T[]> {
    return await this.client.find(this.threadId, collectionName, {})
  }

  async getSingleById<T>(collectionName: string, id: string): Promise<T> {
    return await this.client.findByID<T>(this.threadId, collectionName, id)
  }

  private static instance: Textile

  private static async createThreadIfNotExists(client: Client) {
    const threadName = process.env.APP_THREAD_NAME || 'apollo-demo'
    let thread
    try {
      thread = await client.getThread(threadName)
    } catch (e) {
      client.newDB(undefined, threadName)
      thread = await client.getThread(threadName)
    }
    return ThreadID.fromString(thread.id)
  }

  static async Instance() {
    if (!this.instance) {
      const identity = PrivateKey.fromString(process.env.APP_IDENTITY || '')
      const client = await Client.withKeyInfo({
        key: process.env.APP_API_KEY || '',
        secret: process.env.APP_API_SECRET || ''
      })
      await client.getToken(identity)

      const threadId = await this.createThreadIfNotExists(client)
      const collections = (await client.listCollections(threadId)).map((x) => x.name)
      this.instance = new Textile(client, threadId, collections)
    }
    return this.instance
  }

  private client: Client
  private threadId: ThreadID
  private collections: string[]

  private constructor(client: Client, threadId: ThreadID, collections: string[]) {
    this.client = client
    this.threadId = threadId
    this.collections = collections
  }

  async newCollection(collectionConfig: CollectionConfig) {
    console.log('new collection', collectionConfig.name, JSON.stringify(collectionConfig.schema, null, 2))
    if (!this.collections.some((x) => x === collectionConfig.name)) {
      await this.client.newCollection(this.threadId, collectionConfig)
      this.collections = (await this.client.listCollections(this.threadId)).map((x) => x.name)
    }
  }

  async test() {
    console.log('TEST')
    await this.client.create(this.threadId, 'Vote', [{ NFT: 'test' }])
    const foo = await this.client.find(this.threadId, 'Vote', {})
    console.log('FOOOO', foo)
  }

  async reset() {
    for (let c of this.collections) await this.client.deleteCollection(this.threadId, c)
    console.log('resetted')
    this.collections = []
  }
}
