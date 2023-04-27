import { Candidate, Filter } from '@/models'
import { configureStore } from '@reduxjs/toolkit'
import candidateListSlice from './states/candidateList'
import candidateSlice from './states/candidate'
import filterSlice from './states/filter'

export interface AppStore {
  candidateList: Candidate[]
  candidate: Candidate
  filter: Filter
}

export default configureStore<AppStore>({
  reducer: {
    candidateList: candidateListSlice.reducer,
    candidate: candidateSlice.reducer,
    filter: filterSlice.reducer,
  },
})
