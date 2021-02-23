import { Meme, User, Vote } from './../generated/resolvers-types'
import { Client, CollectionConfig, PrivateKey, ThreadID } from '@textile/hub'

export default class Textile {
  async createUser(name: string | null | undefined, wallet: string | null | undefined) {
    const user = { name, wallet }
    const ids = await this.client.create(this.threadId, 'User', [user])
    return ids[0]
  }
  async getOwner(_id: string): Promise<User | null> {
    return _id
      ? (await this.client.has(this.threadId, 'User', [_id]))
        ? await this.client.findByID(this.threadId, 'User', _id)
        : null
      : null
  }
  async deleteMeme(id: string): Promise<string> {
    await this.client.delete(this.threadId, 'Meme', [id])
    return id
  }
  async createMeme(NFT: string, ownerId: string | null | undefined): Promise<string> {
    const ids = await this.client.create(this.threadId, 'Meme', [{ NFT, ownerId }])
    return ids[0]
  }
  async get<T>(collectionName: string): Promise<T[]> {
    return await this.client.find(this.threadId, collectionName, {})
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

  async reset() {
    for (let c of this.collections) await this.client.deleteCollection(this.threadId, c)
    console.log('resetted')
    this.collections = []
  }
}
