import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Candidate {
    id: ID!
    name: String!
    document: String!
    cv_zonajobs: String
    cv_bumeran: String
    phone: String!
    email: String!
    date: String!
    age: Int!
    has_university: String!
    career: String
    graduated: String
    courses_approved: String
    location: String!
    accepts_working_hours: String!
    desired_salary: String!
    had_interview: String!
    reason: String
  }

  input CreateCandidateInput {
    name: String!
    document: String!
    cv_zonajobs: String
    cv_bumeran: String
    phone: String!
    email: String!
    date: String!
    age: Int!
    has_university: String!
    career: String
    graduated: String
    courses_approved: String
    location: String!
    accepts_working_hours: String!
    desired_salary: String!
    had_interview: String!
    reason: String
  }

  input UpdateCandidateInput {
    name: String!
    document: String!
    cv_zonajobs: String
    cv_bumeran: String
    phone: String!
    email: String!
    date: String!
    age: Int!
    has_university: String!
    career: String
    graduated: String
    courses_approved: String
    location: String!
    accepts_working_hours: String!
    desired_salary: String!
    had_interview: String!
    reason: String
  }

  type Query {
    candidates: [Candidate!]!
    candidate(id: ID!): Candidate
    candidatesByReason(hasReason: String): [Candidate!]!
  }

  type Mutation {
    createCandidate(input: CreateCandidateInput!): Candidate
    updateCandidate(id: ID!, input: UpdateCandidateInput!): Candidate
    deleteCandidate(id: ID!): Candidate
  }
`;

