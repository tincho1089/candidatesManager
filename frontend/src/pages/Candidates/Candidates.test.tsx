import { render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import Candidates from './Candidates'
import { GET_CANDIDATES_BY_REASON } from '@/services'
import store from '@/redux/store'
import { Provider } from 'react-redux'
import { candidates } from '@/utilities'

const mocks = [
  {
    request: {
      query: GET_CANDIDATES_BY_REASON,
      variables: {
        hasReason: 'ALL',
      },
    },
    result: {
      data: {
        candidatesByReason: [candidates[0], candidates[1]],
      },
    },
  },
]

describe('Candidates', () => {
  it('should render loader while loading data', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <Candidates />
        </Provider>
      </MockedProvider>,
    )

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('should render candidates after loading data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <Candidates />
        </Provider>
      </MockedProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('candidate-card-0')).toBeInTheDocument()
      expect(screen.getByTestId('candidate-card-1')).toBeInTheDocument()
    })
  })

  it('should render rejection reasons in filter', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <Candidates />
        </Provider>
      </MockedProvider>,
    )

    await waitFor(() => {
      expect(screen.getByTestId('multiple-chip-label')).toBeInTheDocument()
    })
  })
})
