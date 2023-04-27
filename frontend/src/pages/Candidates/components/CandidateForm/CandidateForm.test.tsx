import { store } from '@/redux'
import { selectCandidate } from '@/redux/states/candidate'
import { candidates } from '@/utilities'
import { MockedProvider } from '@apollo/client/testing'
import { RenderResult, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import CandidateForm from './CandidateForm'
import { UPDATE_CANDIDATE } from '@/services'

const updateMock = [
  {
    request: {
      query: UPDATE_CANDIDATE,
      variables: {
        id: candidates[0].id,
        input: {
          name: candidates[0].name,
          document: candidates[0].document,
          cv_zonajobs: candidates[0].cv_zonajobs,
          cv_bumeran: candidates[0].cv_bumeran,
          phone: candidates[0].phone,
          email: candidates[0].email,
          date: candidates[0].date,
          age: candidates[0].age,
          has_university: candidates[0].has_university,
          career: candidates[0].career,
          graduated: candidates[0].graduated,
          courses_approved: candidates[0].courses_approved,
          location: candidates[0].location,
          accepts_working_hours: candidates[0].accepts_working_hours,
          desired_salary: candidates[0].desired_salary,
          had_interview: candidates[0].had_interview,
          reason: Array.isArray(candidates[0].reason) ? candidates[0].reason.join(', ') : candidates[0].reason,
        },
      },
    },
    result: {
      data: {
        updateCandidate: {
          id: candidates[0].id,
          name: 'New Name',
          email: 'martin@gmail.com',
          document: candidates[0].document,
          cv_zonajobs: candidates[0].cv_zonajobs,
          cv_bumeran: candidates[0].cv_bumeran,
          phone: candidates[0].phone,
          date: candidates[0].date,
          age: candidates[0].age,
          has_university: candidates[0].has_university,
          career: candidates[0].career,
          graduated: candidates[0].graduated,
          courses_approved: candidates[0].courses_approved,
          location: candidates[0].location,
          accepts_working_hours: candidates[0].accepts_working_hours,
          desired_salary: candidates[0].desired_salary,
          had_interview: candidates[0].had_interview,
          reason: Array.isArray(candidates[0].reason) ? candidates[0].reason.join(', ') : candidates[0].reason,
        },
      },
    },
  },
]

describe('CandidateForm', () => {
  let component: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement, HTMLElement>
  beforeEach(() => {
    component = render(
      <MockedProvider mocks={updateMock} addTypename={false}>
        <Provider store={store}>
          <CandidateForm />
        </Provider>
      </MockedProvider>,
    )
    store.dispatch(selectCandidate(candidates[0]))
  })

  it('should render a form with input fields and buttons', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('name-input')).toBeInTheDocument()
      expect(screen.getByTestId('email-input')).toBeInTheDocument()
      expect(screen.getByText('Update')).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })
  })

  it('should prefill the form if a candidate prop is passed', () => {
    const nameInput = screen.getByTestId('name-input') as HTMLInputElement
    const emailInput = screen.getByTestId('email-input') as HTMLInputElement

    expect(nameInput.value).toBe(candidates[0].name)
    expect(emailInput.value).toBe(candidates[0].email)
  })

  it('should submit the form and update a candidate', async () => {
    const { getByRole } = component

    // Fill out form fields
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'New Name' } })
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'martin@gmail.com' } })

    // Submit form
    fireEvent.click(getByRole('button', { name: 'Update' }))

    // Wait for update mutation to be called
    await waitFor(() => {
      expect(screen.queryByTestId('name-input')).toBeNull()
      expect(screen.queryByTestId('email-input')).toBeNull()
    })
  })
})
