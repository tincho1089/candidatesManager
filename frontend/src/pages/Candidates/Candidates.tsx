import { Candidate, candidateTableColumns } from '@/models'
import { createListCandidate } from '@/redux/states/candidateList'
import { AppStore } from '@/redux/store'
import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../components/Loader'
import { GET_CANDIDATES_BY_REASON } from '../../services/services'
import styles from './Candidates.module.scss'
import { CandidateCard, CandidateForm } from './components'
import Filters from './components/Filters/Filters'
import { createRejectionReasonFilter } from '@/redux/states/filter'
import { getRejectionReasons } from '@/utilities'

function Candidates() {
  const dispatch = useDispatch()
  const filter = useSelector((store: AppStore) => store.filter)
  const candidatesState = useSelector((store: AppStore) => store.candidateList)
  const { loading, data } = useQuery(GET_CANDIDATES_BY_REASON, {
    variables: {
      hasReason: filter.stateFilter,
    },
  })

  useEffect(() => {
    if (data) {
      dispatch(createListCandidate(data.candidatesByReason))
      if (filter.rejectionReasonsFilter.length === 0) {
        dispatch(createRejectionReasonFilter(getRejectionReasons(data.candidatesByReason)))
      }
    }
  }, [data, dispatch])

  if (loading) {
    return <Loader />
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerWrapper}>
        <Filters />
      </div>
      <div className={styles.cardContainer}>
        <CandidateCard data-testid='candidate-card' candidate={candidateTableColumns} />
        {candidatesState.map((candidate: Candidate, key: number) => (
          <div key={key} data-testid={`candidate-card-${key}`}>
            <CandidateCard candidate={candidate} />
          </div>
        ))}
      </div>
      <CandidateForm />
    </div>
  )
}

export default Candidates
