import { gql, useQuery, useMutation } from '@apollo/client'

export const GET_CANDIDATES = gql`
  query GetCandidates {
    candidates {
      id
      name
      document
      cv_zonajobs
      cv_bumeran
      phone
      email
      date
      age
      has_university
      career
      graduated
      courses_approved
      location
      accepts_working_hours
      desired_salary
      had_interview
      reason
    }
  }
`

export const GET_CANDIDATES_BY_REASON = gql`
  query CandidatesByReason($hasReason: String) {
    candidatesByReason(hasReason: $hasReason) {
      id
      name
      document
      cv_zonajobs
      cv_bumeran
      phone
      email
      date
      age
      has_university
      career
      graduated
      courses_approved
      location
      accepts_working_hours
      desired_salary
      had_interview
      reason
    }
  }
`

export const CREATE_CANDIDATE = gql`
  mutation CreateCandidate($input: CreateCandidateInput!) {
    createCandidate(input: $input) {
      id
      name
      email
    }
  }
`

export const UPDATE_CANDIDATE = gql`
  mutation UpdateCandidate($id: ID!, $input: UpdateCandidateInput!) {
    updateCandidate(id: $id, input: $input) {
      id
      name
      email
    }
  }
`

export const DELETE_CANDIDATE = gql`
  mutation DeleteCandidate($id: ID!) {
    deleteCandidate(id: $id) {
      id
    }
  }
`

export function useUpdateCandidate() {
  return useMutation(UPDATE_CANDIDATE)
}

export function useDeleteCandidate() {
  return useMutation(DELETE_CANDIDATE)
}

export function useGetCandidates() {
  return useQuery(GET_CANDIDATES)
}

export function useCreateCandidate() {
  return useMutation(CREATE_CANDIDATE)
}
