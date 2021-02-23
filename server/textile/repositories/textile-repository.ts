import { PubSub } from 'apollo-server'
import { Client, ThreadID } from '@textile/hub'
import { v4 as uuid } from 'uuid'
interface TextileCollection {
  _id: string
  __typename?: string
}
export default abstract class TextileRepository<T extends TextileCollection> {
  protected readonly collectionName: string
  protected readonly client: Client
  protected readonly threadId: ThreadID
  protected readonly pubSub: PubSub
  constructor(name: string, client: Client, threadID: ThreadID, pubSub: PubSub) {
    this.collectionName = name
    this.client = client
    this.threadId = threadID
    this.pubSub = pubSub
  }

  async all() {
    return await this.client.find<T>(this.threadId, this.collectionName, {})
  }

  async getById(_id: string | null | undefined): Promise<T | null> {
    return _id
      ? (await this.client.has(this.threadId, this.collectionName, [_id]))
        ? await this.client.findByID(this.threadId, this.collectionName, _id)
        : null
      : null
  }

  async deleteById(_id: string): Promise<boolean> {
    try {
      await this.client.delete(this.threadId, this.collectionName, [_id])
      return true
    } catch {
      return false
    }
  }

  async create(t: Omit<T, '_id' | '__typename'>): Promise<string> {
    return (await this.client.create(this.threadId, this.collectionName, [t]))[0]
  }

  private subscribe(filter: string) {
    const trigger = uuid()
    this.client.listen(this.threadId, [{ actionTypes: [filter], collectionName: this.collectionName }], (reply) =>
      this.pubSub.publish(trigger, reply?.instance)
    )
    return this.pubSub.asyncIterator(trigger)
  }
  get subscribeCreate() {
    return this.subscribe('CREATE')
  }

  get subscribeDelete() {
    return this.subscribe('DELETE')
  }
}
