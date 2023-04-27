import { CustomModal, MultipleSelector } from '@/components'
import { selectCandidate } from '@/redux/states/candidate'
import { AppStore } from '@/redux/store'
import { GET_CANDIDATES_BY_REASON, useUpdateCandidate } from '@/services/services'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Candidate } from '../../models'
import styles from './CandidateForm.module.scss'
import { SnackbarUtilities } from '@/utilities'

export default function CandidateForm() {
  const dispatch = useDispatch()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const selectedCandidate = useSelector((store: AppStore) => store.candidate)
  const filter = useSelector((store: AppStore) => store.filter)
  const defaultValues = selectedCandidate
  const { register, handleSubmit, reset } = useForm<Candidate>({
    defaultValues: defaultValues,
  })
  const [updateCandidate] = useUpdateCandidate()
  const onSubmit: SubmitHandler<Candidate> = (data) => tryCreateCandidate(data)

  const tryCreateCandidate = (data: Candidate) => {
    handleUpdateCandidate(data)
    reset()
    setModalIsOpen(false)
  }

  const handleColumnName = (column: string[]) => {
    const candidateModified = { ...selectedCandidate, reason: column }
    dispatch(selectCandidate(candidateModified))
  }

  useEffect(() => {
    if (selectedCandidate.id) {
      setModalIsOpen(true)
    }
  }, [selectedCandidate, dispatch])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  const handleUpdateCandidate = async (Candidate: Candidate) => {
    return await updateCandidate({
      variables: {
        id: selectedCandidate?.id,
        input: {
          name: Candidate.name,
          document: Candidate.document,
          cv_zonajobs: Candidate.cv_zonajobs,
          cv_bumeran: Candidate.cv_bumeran,
          phone: Candidate.phone,
          email: Candidate.email,
          date: Candidate.date,
          age: Candidate.age,
          has_university: Candidate.has_university,
          career: Candidate.career,
          graduated: Candidate.graduated,
          courses_approved: Candidate.courses_approved,
          location: Candidate.location,
          accepts_working_hours: Candidate.accepts_working_hours,
          desired_salary: Candidate.desired_salary,
          had_interview: Candidate.had_interview,
          reason: Array.isArray(Candidate.reason) ? Candidate.reason.join(', ') : Candidate.reason,
        },
      },
      refetchQueries: [
        {
          query: GET_CANDIDATES_BY_REASON,
          variables: {
            hasReason: filter.stateFilter,
          },
        },
      ],
      onCompleted: () => {
        SnackbarUtilities.success('Candidate updated successfully')
      },
    })
  }

  return (
    <>
      <CustomModal isOpen={modalIsOpen}>
        <h2>Candidate</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formControl}>
            <label htmlFor='name'>Name:</label>
            <input type='text' data-testid='name-input' {...register('name', { required: true })} defaultValue={defaultValues?.name} />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='document'>Document:</label>
            <textarea data-testid='document-input' {...register('document', { required: true })} defaultValue={defaultValues?.document} />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='cv_zonajobs'>CV ZonaJobs:</label>
            <textarea
              data-testid='cv_zonajobs-input'
              {...register('cv_zonajobs', { required: false })}
              defaultValue={defaultValues?.cv_zonajobs}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='cv_bumeran'>CV Boomerang:</label>
            <textarea
              data-testid='cv_bumeran-input'
              {...register('cv_bumeran', { required: false })}
              defaultValue={defaultValues?.cv_bumeran}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='phone'>Phone:</label>
            <textarea data-testid='phone-input' {...register('phone', { required: true })} defaultValue={defaultValues?.phone} />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='email'>Email:</label>
            <textarea data-testid='email-input' {...register('email', { required: true })} defaultValue={defaultValues?.email} />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='date'>Date:</label>
            <textarea data-testid='date-input' {...register('date', { required: true })} defaultValue={defaultValues?.date} />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='age'>Age:</label>
            <textarea data-testid='age-input' {...register('age', { required: true })} defaultValue={defaultValues?.age} />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='has_university'>Has University:</label>
            <textarea
              data-testid='has_university-input'
              {...register('has_university', { required: true })}
              defaultValue={defaultValues?.has_university}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='career'>Career:</label>
            <textarea data-testid='career-input' {...register('career', { required: false })} defaultValue={defaultValues?.career} />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='graduated'>Graduated:</label>
            <textarea
              data-testid='graduated-input'
              {...register('graduated', { required: false })}
              defaultValue={defaultValues?.graduated}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='courses_approved'>Courses Approved:</label>
            <textarea
              data-testid='courses_approved-input'
              {...register('courses_approved', { required: false })}
              defaultValue={defaultValues?.courses_approved}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='location'>Location:</label>
            <textarea data-testid='location-input' {...register('location', { required: true })} defaultValue={defaultValues?.location} />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='accepts_working_hours'>Accepts Working Hours:</label>
            <textarea
              data-testid='accepts_working_hours-input'
              {...register('accepts_working_hours', { required: true })}
              defaultValue={defaultValues?.accepts_working_hours}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='desired_salary'>Desired Salary:</label>
            <textarea
              data-testid='desired_salary-input'
              {...register('desired_salary', { required: true })}
              defaultValue={defaultValues?.desired_salary}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='had_interview'>Had Interview:</label>
            <textarea
              data-testid='had_interview-input'
              {...register('had_interview', { required: true })}
              defaultValue={defaultValues?.had_interview}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor='reason'>Reason:</label>
            <MultipleSelector
              value={Array.isArray(defaultValues.reason) ? defaultValues.reason : []}
              names={filter.rejectionReasonsFilter}
              getColumnName={handleColumnName}
              label={'Reasons'}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button variant='contained' type='submit'>
              {selectedCandidate?.id ? 'Update' : 'Create'}
            </Button>
            <Button variant='contained' type='button' onClick={() => setModalIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CustomModal>
    </>
  )
}
