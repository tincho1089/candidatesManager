import { Candidate } from '@/models'
import { selectCandidate } from '@/redux/states/candidate'
import { AppStore } from '@/redux/store'
import { GET_CANDIDATES_BY_REASON, useDeleteCandidate } from '@/services'
import { SnackbarUtilities } from '@/utilities/snackbar-manager'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import styles from './CandidateCard.module.scss'

interface CandidateCardProps {
  candidate: Candidate
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  const dispatch = useDispatch()
  const filterState = useSelector((store: AppStore) => store.filter)
  const [deleteCandidate] = useDeleteCandidate()

  const handleSelectCandidate = (candidate: Candidate) => {
    dispatch(selectCandidate(candidate))
  }

  const handleDeleteCandidate = async (candidate: Candidate) => {
    await deleteCandidate({
      variables: {
        id: candidate?.id,
      },
      refetchQueries: [
        {
          query: GET_CANDIDATES_BY_REASON,
          variables: {
            hasReason: filterState.stateFilter,
          },
        },
      ],
      onCompleted: () => {
        SnackbarUtilities.success('Candidate removed successfully')
      },
    })
  }

  return (
    <div className={styles.Card}>
      <div className={styles.CardContent}>
        {filterState.columnNames.length > 0 ? (
          filterState.columnNames.map((column: string, key: number) => {
            const value = candidate[column as keyof Candidate]?.toString()
            return (
              <div key={key} className={`${styles.column}  ${key % 2 === 0 ? styles.even : styles.odd}`}>
                <div className={!candidate.reason ? styles.approved : null}>
                  <Typography variant='body2' color='text.secondary' key={key} className={styles.column}>
                    {value?.indexOf('http') ? (
                      value
                    ) : (
                      <a href={value} target='blank'>
                        Link
                      </a>
                    )}
                  </Typography>
                </div>
              </div>
            )
          })
        ) : (
          <Typography variant='body2' color='text.secondary'>
            {candidate.name}
          </Typography>
        )}
      </div>
      <CardActions className={candidate.id ? styles.cardActions : styles.hidden}>
        <Button size='small' variant='contained' onClick={() => handleSelectCandidate(candidate)}>
          Edit
        </Button>
        <Button size='small' variant='contained' onClick={() => handleDeleteCandidate(candidate)}>
          Remove
        </Button>
      </CardActions>
    </div>
  )
}
