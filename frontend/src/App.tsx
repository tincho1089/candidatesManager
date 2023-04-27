import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { RoutesManager } from './components'
import { RoutesWithNotFound } from './utilities'
const Candidates = lazy(() => import('./pages/Candidates/Candidates'))
import './App.css'

function App() {
  return (
    <div className='App'>
      <RoutesManager>
        <RoutesWithNotFound>
          <Route path='/' element={<Candidates />} />
        </RoutesWithNotFound>
      </RoutesManager>
    </div>
  )
}

export default App
