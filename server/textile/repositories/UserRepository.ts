import {  User } from '../../generated/resolvers-types'
import TextileRepository from './textile-repository'

export class UserRepository extends TextileRepository<User> {}
