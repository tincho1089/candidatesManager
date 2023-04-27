import mongoose from 'mongoose';

export interface ICandidate {
  id?: string
  name: string
  document: number
  cv_zonajobs: string
  cv_bumeran: string
  phone: string
  email: string
  date: string
  age: number
  has_university: string
  career: string
  graduated: string
  courses_approved: string
  location: string
  accepts_working_hours: string
  desired_salary: string
  had_interview: string
  reason: string
}

export interface CandidateDocument extends mongoose.Document {
  id?: string
  name: string
  document: number
  cv_zonajobs: string
  cv_bumeran: string
  phone: string
  email: string
  date: string
  age: number
  has_university: string
  career: string
  graduated: string
  courses_approved: string
  location: string
  accepts_working_hours: string
  desired_salary: string
  had_interview: string
  reason: string
}

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  document: { type: String, required: true },
  cv_zonajobs: { type: String, required: false },
  cv_bumeran: { type: String, required: false },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  age: { type: String, required: true },
  has_university: { type: String, required: true },
  career: { type: String, required: false },
  graduated: { type: String, required: false },
  courses_approved: { type: String, required: false },
  location: { type: String, required: true },
  accepts_working_hours: { type: String, required: true },
  desired_salary: { type: String, required: true },
  had_interview: { type: String, required: true },
  reason: { type: String, required: false },
});

export const Candidate = mongoose.model<CandidateDocument>('Candidate', CandidateSchema);