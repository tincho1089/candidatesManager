import { Candidate } from './models';

export const resolvers = {
  Query: {
    candidates: async () => {
      const candidates = await Candidate.find();
      return candidates;
    },
    candidate: async (_: any, { id }: any) => {
      const candidate = await Candidate.findById(id);
      return candidate;
    },
    candidatesByReason: async (_: any, { hasReason }: any) => {
      let candidates;
      if (hasReason == 'REJECTED') {
        candidates = await Candidate.find({ reason: { $ne: "" } });
      } else if(hasReason == 'APPROVED') {
        candidates = await Candidate.find({ reason: "" });
        
      } else {
        candidates = await Candidate.find();
      }
      return candidates;
    },
  },
  Mutation: {
    createCandidate: async (_: any, { input }: any) => {
      const candidate = await Candidate.create(input);
      return candidate;
    },
    updateCandidate: async (_: any, { id, input }: any) => {
      const candidate = await Candidate.findByIdAndUpdate(id, input, { new: true });
      return candidate;
    },
    deleteCandidate: async (_: any, { id }: any) => {
      const candidate = await Candidate.findByIdAndDelete(id);
      return candidate;
    },
  },
};

