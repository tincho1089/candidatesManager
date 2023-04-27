import { Candidate, emptyCandidate } from '@/models'
import { getRejectionReasons } from '@/utilities'
import { createSlice } from '@reduxjs/toolkit'

export const EmptyCandidateState: Candidate = emptyCandidate

export const Key = 'candidate'

export const candidateSlice = createSlice({
  name: Key,
  initialState: EmptyCandidateState,
  reducers: {
    selectCandidate: (state, action) => {
      const reason = getRejectionReasons([action.payload])
      return { ...action.payload, reason: reason }
    },
    createCandidate: (state, action) => {
      return action.payload
    },
    updateCandidate: (state, action) => {
      return { ...state, ...action.payload }
    },
    resetCandidate: () => {
      return EmptyCandidateState
    },
  },
})

export const { selectCandidate, createCandidate, updateCandidate, resetCandidate } = candidateSlice.actions

export default candidateSlice
