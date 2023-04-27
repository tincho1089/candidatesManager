export interface Filter {
  columnNames: string[]
  stateFilter: string | null
  rejectionReasonsFilter: string[]
}

export interface StateOption {
  value: string
  label: string
}

export const columnNames = [
  'name',
  'document',
  'cv_zonajobs',
  'cv_bumeran',
  'phone',
  'email',
  'date',
  'age',
  'has_university',
  'career',
  'graduated',
  'courses_approved',
  'location',
  'accepts_working_hours',
  'desired_salary',
  'had_interview',
  'reason',
]

export const stateFilterOptions: StateOption[] = [
  { value: 'ALL', label: 'All' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'REJECTED', label: 'Rejected' },
]

export const emptyFilter: Filter = {
  columnNames: ['name', 'phone', 'email', 'age', 'reason'],
  stateFilter: 'ALL',
  rejectionReasonsFilter: [],
}
