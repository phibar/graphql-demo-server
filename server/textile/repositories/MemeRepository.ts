import { PubSub } from 'apollo-server'
import { Meme } from '../../generated/resolvers-types'
import TextileRepository from './textile-repository'

export class MemeRepository extends TextileRepository<Meme> {
  
}
