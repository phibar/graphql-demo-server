import { Resolvers } from "../generated/resolvers-types";
import Textile from "../textile/textitle";

export const resolvers: Resolvers<Textile> = {
  Query: {
    votes: async (parent, args, context) => await context.get("Vote"),
    vote: async (parent, args, context) => await context.getSingleById("Vote", args.id || ""),
  },
};
