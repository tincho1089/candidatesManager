import { Candidate } from '@/models'

export const getRejectionReasons = (candidateList: Candidate[]) => {
  const reasons: string[] = []
  candidateList.forEach((item: Candidate) => {
    if (!Array.isArray(item.reason)) {
      reasons.push(...item.reason.split(',').map((reason) => reason.trim()))
    } else {
      reasons.push(...item.reason)
    }
  })
  const filteredReasons = reasons.filter((reason) => reason !== '')
  return Array.from(new Set(filteredReasons))
}
