import { Meme, User, Vote } from './../generated/resolvers-types'
import { Client, CollectionConfig, PrivateKey, ThreadID } from '@textile/hub'

export default class Textile {
  async createUser(name: string | null | undefined, wallet: string | null | undefined) {
    const user = { name, wallet }
    const ids = await this.client.create(this.threadId, 'User', [user])
    return ids[0]
  }
  async getOwner(_id: string | null | undefined): Promise<User | null> {
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
  async createMeme(nft: string, ownerId: string | null | undefined): Promise<string> {
    const meme: Meme = { _id: '', nft, owner: { _id: ownerId } }
    const ids = await this.client.create(this.threadId, 'Meme', [meme])
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
      await client.newDB(ThreadID.fromRandom(), threadName)
      thread = await client.getThread(threadName)
    }
    return ThreadID.fromString(thread.id)
  }

  static async Instance() {
    if (!this.instance) {
      await Textile.initInstance()
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

  private static async initInstance() {
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

  async newCollection(collectionConfig: CollectionConfig) {
    console.log(
      `create new collection ${collectionConfig.name} with schema:`,
      JSON.stringify(collectionConfig.schema, null, 2)
    )
    if (!this.collections.some((x) => x === collectionConfig.name)) {
      await this.client.newCollection(this.threadId, collectionConfig)
      this.collections = (await this.client.listCollections(this.threadId)).map((x) => x.name)
    }
  }

  async reset(hardReset = false) {
    console.log('Reset of old threadDB')

    if (hardReset) {
      console.log('thread delete started')
      await this.client.deleteDB(this.threadId)
      console.log('thread deleted')
      await Textile.initInstance()
      console.log('thread recreated')
    } else {
      for (let c of this.collections) {
        console.log(`truncate ${c}`)
        const ids = (await this.client.find(this.threadId, c, {})) as string[]
        await this.client.delete(this.threadId, c, ids)
        console.log(`delete collection ${c}`)
        await this.client.deleteCollection(this.threadId, c)
      }
    }
    this.collections = []
    return await Textile.Instance()
  }
}
