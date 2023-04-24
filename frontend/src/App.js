import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"
import { useEffect, Suspense, lazy, useState } from "react"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote, getSite } from './requests'

const Login = lazy(() => import('./components/Login'))
const Register = lazy(() => import('./components/Register'))
const Home = lazy(() => import('./components/Home'))

const App = () => {


  const result = useQuery(['site'], getSite)
  console.log(result)



  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    /*     client.resetStore() */
  }

  useEffect(() => {
    if (!token) {
      const localtoken = localStorage.getItem('ecom')
      if (localtoken) {
        setToken(localtoken)
      }
    }
  }, [token])

  if (result.isLoading) return 'Loading...'

  return (
    <>
      <Router>
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/" element={<Home token={token} setError={notify} logout={logout} />} />

            {/*               <Route path="changepass/:userid/:token" element={<ChangePass notify={notify} setToken={setToken} errorMessage={errorMessage} />} />
              <Route path="forgotpass" element={<ForgotPass notify={notify} setToken={setToken} errorMessage={errorMessage} />} />
               */}
            <Route path="login" element={token ? <Navigate replace to="/" /> : <Login notify={notify} setToken={setToken} errorMessage={errorMessage} />} />
            <Route path="register" element={!token ? <Register notify={notify} setToken={setToken} errorMessage={errorMessage} /> : <Navigate replace to="/" />} />


          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App