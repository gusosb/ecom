import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"
import { useEffect, Suspense, lazy, useState } from "react"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote, getSite, getCategories } from './requests'

const Login = lazy(() => import('./components/Login'))
const Register = lazy(() => import('./components/Register'))
const Home = lazy(() => import('./components/Home'))
const Admin = lazy(() => import('./components/Admin'))
const AdminItems = lazy(() => import('./components/AdminItems'))
const AdminOrders = lazy(() => import('./components/AdminOrders'))
const FrontPage = lazy(() => import('./components/FrontPage'))
const Category = lazy(() => import('./components/Category'))
const Item = lazy(() => import('./components/Item'))
const Checkout = lazy(() => import('./components/Checkout'))

const App = () => {

  console.log('language')
  console.log(navigator.language)

  const result = useQuery(['categories'], getCategories, {
    refetchOnWindowFocus: false
  })
  const queryClient = useQueryClient()

  const [errorMessage, setErrorMessage] = useState(null)
  const [cart, setCart] = useState({})
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

  const removeFromCart = (key) => {
    const values = { ...cart }
    delete values[key]
    setCart(values)
  }

  const changeVariantQuantity = (change, variant) => {
    const values = { ...cart }
    if (values[variant].quantity === 1 && change < 0) {
      removeFromCart(variant)
      return
    }
    values[variant].quantity += change
    setCart(values)
  }

  useEffect(() => {
    if (!token) {
      const localtoken = localStorage.getItem('ecom')

      if (localtoken && localtoken !== 'undefined') {
        setToken(localtoken)
      }
    }
    console.log(cart);

  }, [token, cart])

  if (result.isLoading) return 'Loading...'

  return (
    <>
      <Router>
        <Suspense fallback={<></>}>
          <Routes>
            {/* <Route path='/:categoryname?/:subonecategoryname?/:subtwocategoryname?' element={<Home token={token} setError={notify} logout={logout} />} /> */}


            {/* <Route path='/admin/*' element={<Admin notify={notify} setToken={setToken} errorMessage={errorMessage} />} /> */}

            {/* <Route path="/admin/items/:categoryid?/:itemid?" element={result.data && <AdminItems queryClient={queryClient} categories={result.data} />} /> */}
            <Route path="/admin/items/:categoryid?/:subonecategoryid?/:subtwocategoryid?/:itemid?/:variantid?" element={result.data && <AdminItems queryClient={queryClient} categories={result.data} />} />
            <Route path="/admin/orders" element={<AdminOrders queryClient={queryClient} categories={result.data} />} />

            <Route path="/" element={<Home changeVariantQuantity={changeVariantQuantity} removeFromCart={removeFromCart} cart={cart} setCart={setCart} categories={result.data} token={token} notify={notify} setToken={setToken} errorMessage={errorMessage} />}>
              <Route index element={(<FrontPage />)} />
              <Route path="/checkout" element={<Checkout cart={cart} />} />
              <Route path="/:categoryname?/:subonecategoryname?/:subtwocategoryname?" element={<Category />} />
              {/* <Route path="/:categoryname/:subonecategoryname/:subtwocategoryname/:itemid/:itemname?" element={<Item />} /> */}
              <Route path="/product/:itemid/:itemname?" element={<Item changeVariantQuantity={changeVariantQuantity} cart={cart} setCart={setCart} />} />
            </Route>

            {/*               <Route path="changepass/:userid/:token" element={<ChangePass notify={notify} setToken={setToken} errorMessage={errorMessage} />} />
              <Route path="forgotpass" element={<ForgotPass notify={notify} setToken={setToken} errorMessage={errorMessage} />} />
               */}
            <Route path='login' element={token ? <Navigate replace to="/" /> : <Login notify={notify} setToken={setToken} errorMessage={errorMessage} />} />
            <Route path='register' element={!token ? <Register notify={notify} setToken={setToken} errorMessage={errorMessage} /> : <Navigate replace to="/" />} />
            {/* <Route path="admin/:categoryid?/:itemid?" element={token ? <Admin queryClient={queryClient} categories={result.data} notify={notify} setToken={setToken} errorMessage={errorMessage} /> : <Navigate replace to="/" />} />

            <Route path="admin" element={<Admin />}>
              <Route path="items/:categoryid?/:itemid?" element={<AdminItems />} />
              <Route path="orders/:orderid?" element={<AdminOrders />} />
            </Route> */}


          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App