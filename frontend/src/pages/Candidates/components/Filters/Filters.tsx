import { BasicSelect, MultipleSelector } from '@/components'
import { columnNames, stateFilterOptions } from '@/models'
import { createFilter, createStateFilter } from '@/redux/states/filter'
import { AppStore } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Filters.module.scss'

function Candidates() {
  const dispatch = useDispatch()
  const candidatesState = useSelector((store: AppStore) => store.candidateList)
  const filter = useSelector((store: AppStore) => store.filter)

  const handleColumnName = (column: string[]) => {
    dispatch(createFilter(column))
  }

  const handleState = (state: string | number) => {
    dispatch(createStateFilter(state))
  }

  return (
    <div className={styles.mainContainer}>
      <h2>Candidates ({candidatesState.length})</h2>
      <div>
        <p>Here you can see all the candidates that have applied for the job.</p>
      </div>
      <div className={styles.filterPanel}>
        <MultipleSelector value={filter.columnNames} names={columnNames} getColumnName={handleColumnName} label={'Columns to show'} />
        <BasicSelect initialValue={filter.stateFilter} options={stateFilterOptions} getOption={handleState} label={'State'} />
      </div>
    </div>
  )
}

export default Candidates
