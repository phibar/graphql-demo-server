import { MemeRepository } from "../textile/repositories/MemeRepository";
import { VoteRepository } from "../textile/repositories/VoteRepository";
import { UserRepository } from "../textile/repositories/UserRepository";
import Textile from '../textile/textitle';


export class ResolverContext {
  readonly User: UserRepository;
  readonly Meme: MemeRepository;
  readonly Vote: VoteRepository;

  constructor(t: Textile) {
    this.User = t.getRepository(UserRepository, 'User');
    this.Meme = t.getRepository(MemeRepository, 'Meme');
    this.Vote = t.getRepository(VoteRepository, 'Vote');
  }
}
