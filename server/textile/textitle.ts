import { PubSub } from 'apollo-server'
import { Client, CollectionConfig, PrivateKey, ThreadID } from '@textile/hub'

export default class Textile {
  private static instance: Textile

  private static async initInstance() {
    const identity = PrivateKey.fromString(process.env.APP_IDENTITY || '')
    const client = await Client.withKeyInfo({
      key: process.env.APP_API_KEY || '',
      secret: process.env.APP_API_SECRET || ''
    })
    await client.getToken(identity)

    const threadId = await this.createThreadIfNotExists(client)
    const collections = (await client.listCollections(threadId)).map((x) => x.name)
    this.instance = new Textile(client, threadId, collections, new PubSub())
  }

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
  private pubSub: PubSub

  private constructor(client: Client, threadId: ThreadID, collections: string[], pubSub: PubSub) {
    this.client = client
    this.threadId = threadId
    this.collections = collections
    this.pubSub = pubSub
  }

  getRepository<T extends new (name: string, client: Client, threadID: ThreadID, pubSub: PubSub) => InstanceType<T>>(
    constructor: T,
    name: string
  ) {
    return new constructor(name, this.client, this.threadId, this.pubSub)
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
        console.log(`truncate ${c} done`)
      }
    }
    this.collections = []
    return await Textile.Instance()
  }
}
