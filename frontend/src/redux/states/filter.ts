import { Filter, emptyFilter } from '@/models'
import { createSlice } from '@reduxjs/toolkit'

export const EmptyFilterState: Filter = emptyFilter

export const Key = 'filter'

export const filterSlice = createSlice({
  name: Key,
  initialState: localStorage.getItem(Key) ? JSON.parse(localStorage.getItem(Key) as string) : EmptyFilterState,
  reducers: {
    createFilter: (state, action) => {
      return { ...state, columnNames: action.payload }
    },
    createStateFilter: (state, action) => {
      return { ...state, stateFilter: action.payload }
    },
    createRejectionReasonFilter: (state, action) => {
      return { ...state, rejectionReasonsFilter: action.payload }
    },
    updateFilter: (state, action) => {
      return { ...state, ...action.payload }
    },
    resetFilter: () => {
      return EmptyFilterState
    },
  },
})

export const { createFilter, createStateFilter, createRejectionReasonFilter, updateFilter, resetFilter } = filterSlice.actions

export default filterSlice
