export interface Candidate {
  id?: string
  name: string
  document: number | string
  cv_zonajobs: string
  cv_bumeran: string
  phone: string
  email: string
  date: string
  age: number | string
  has_university: string
  career: string
  graduated: string
  courses_approved: string
  location: string
  accepts_working_hours: string
  desired_salary: string
  had_interview: string
  reason: string | string[]
}

export const emptyCandidate: Candidate = {
  id: '',
  name: '',
  document: 0,
  cv_zonajobs: '',
  cv_bumeran: '',
  phone: '',
  email: '',
  date: '',
  age: 0,
  has_university: '',
  career: '',
  graduated: '',
  courses_approved: '',
  location: '',
  accepts_working_hours: '',
  desired_salary: '',
  had_interview: '',
  reason: '',
}

export const candidateTableColumns = {
  id: '',
  name: 'Name',
  document: 'Document',
  cv_zonajobs: 'Zonajobs',
  cv_bumeran: 'Bumeran',
  phone: 'Phone',
  email: 'Email',
  date: 'Date',
  age: 'Age',
  has_university: 'University',
  career: 'Career',
  graduated: 'Graduated',
  courses_approved: 'Courses Approved',
  location: 'Location',
  accepts_working_hours: 'Working Hours',
  desired_salary: 'Desired Salary',
  had_interview: 'Interviewed',
  reason: 'Reason',
}
