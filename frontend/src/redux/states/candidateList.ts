import { Candidate, emptyCandidate } from '@/models'
import { createSlice } from '@reduxjs/toolkit'

export const EmptyCandidateState: Candidate[] = [emptyCandidate]

export const Key = 'candidate'

export const candidateListSlice = createSlice({
  name: Key,
  initialState: EmptyCandidateState,
  reducers: {
    createListCandidate: (state, action) => {
      return action.payload
    },
    updateListCandidate: (state, action) => {
      const result = { ...state, ...action.payload }
      return result
    },
    resetListCandidate: () => {
      return EmptyCandidateState
    },
  },
})

export const { createListCandidate, updateListCandidate, resetListCandidate } = candidateListSlice.actions

export default candidateListSlice
