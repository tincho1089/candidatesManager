import { store } from '@/redux'
import { candidates } from '@/utilities'
import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import CandidateCard from './CandidateCard'

describe('CandidateCard component', () => {
  beforeEach(() => {
    render(
      <MockedProvider addTypename={false}>
        <Provider store={store}>
          <CandidateCard candidate={candidates[0]} />
        </Provider>
      </MockedProvider>,
    )
  })

  it('renders the user information', () => {
    expect(screen.getByText(candidates[0].name)).toBeInTheDocument()
    expect(screen.getByText(candidates[0].email)).toBeInTheDocument()
  })
})
