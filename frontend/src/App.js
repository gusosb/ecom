import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, Suspense, lazy, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategories, baseUrl } from './requests';
import Category from './components/Category';
import Item from './components/Item';

const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const Home = lazy(() => import('./components/Home'));
const AdminItems = lazy(() => import('./components/AdminItems'));
const AdminOrders = lazy(() => import('./components/AdminOrders'));
const FrontPage = lazy(() => import('./components/FrontPage'));
const Checkout = lazy(() => import('./components/CheckoutStripe'));
const Confirmation = lazy(() => import('./components/ConfirmationWrapper'));
const Review = lazy(() => import('./components/Review'));
const Contact = lazy(() => import('./components/Contact'));

const App = () => {

  const result = useQuery(['categories'], getCategories, {
    refetchOnWindowFocus: false
  });
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState(null);
  const [cart, setCart] = useState({});
  const [avoidReading, setAvoidReading] = useState(false);
  const [token, setToken] = useState(null);

  console.log(cart);

  const totalSumInCart = cart && Object.keys(cart)?.length > 0 ? Object.keys(cart).reduce((acc, key) => acc + (cart[key].quantity * cart[key].price * (1 + (cart[key].vatRateSE / 10000))), 0) : 0;

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null)
    localStorage.clear()
    /*     client.resetStore() */
  };

  const removeFromCart = (key) => {
    const values = { ...cart }
    delete values[key]
    setCart(values)
  };

  const changeVariantQuantity = (change, variant) => {
    const values = { ...cart };
    if (values[variant].quantity === 1 && change < 0) {
      removeFromCart(variant);
      return;
    }
    values[variant].quantity += change;
    setCart(values);
  };

  const format = (str) => {
    return str.toFixed(0).replace('.', ',');
  }

  useEffect(() => {
    if (!token) {
      const localtoken = localStorage.getItem('ecom');
      if (localtoken && localtoken !== 'undefined') setToken(localtoken);
    }
    if (!cart?.length && !avoidReading) {
      const localCart = JSON.parse(localStorage.getItem('ecomcart'));
      setCart(localCart);
      setAvoidReading(true);
    } else localStorage.setItem('ecomcart', JSON.stringify(cart));

  }, [token, cart, avoidReading]);


  if (result.isLoading) return 'Loading...';

  return (
    <>
      <Router>
        <Suspense fallback={<></>}>
          <Routes>

            <Route path="/admin/items/:categoryid?/:subonecategoryid?/:subtwocategoryid?/:itemid?/:variantid?" element={result.data && <AdminItems queryClient={queryClient} categories={result.data} />} />
            <Route path="/admin/orders" element={<AdminOrders queryClient={queryClient} categories={result.data} />} />

            <Route path="/" element={<Home baseUrl={baseUrl} format={format} totalSumInCart={totalSumInCart} changeVariantQuantity={changeVariantQuantity} removeFromCart={removeFromCart} cart={cart} setCart={setCart} categories={result.data} token={token} notify={notify} setToken={setToken} errorMessage={errorMessage} />}>
              <Route index element={(<FrontPage />)} />
              <Route path="/checkout" element={<Checkout baseUrl={baseUrl} format={format} changeVariantQuantity={changeVariantQuantity} removeFromCart={removeFromCart} queryClient={queryClient} totalSumInCart={totalSumInCart} cart={cart} />} />
              <Route path="/:categoryname?/:subonecategoryname?/:subtwocategoryname?" element={<Category format={format} baseUrl={baseUrl} categories={result.data || []} />} />
              <Route path="/product/:itemid/:itemname?" element={<Item baseUrl={baseUrl} format={format} categories={result.data || []} changeVariantQuantity={changeVariantQuantity} cart={cart} setCart={setCart} />} />
              <Route path="/review/:itemid/:orderid/:itemname?" element={<Review baseUrl={baseUrl} format={format} categories={result.data || []} changeVariantQuantity={changeVariantQuantity} cart={cart} setCart={setCart} queryClient={queryClient} />} />
              <Route path='/confirmation' element={<Confirmation setCart={setCart} format={format} />} />
              <Route path='/login' element={token ? <Navigate replace to="/" /> : <Login notify={notify} setToken={setToken} errorMessage={errorMessage} />} />
              <Route path='/register' element={!token ? <Register notify={notify} setToken={setToken} errorMessage={errorMessage} /> : <Navigate replace to="/" />} />

              <Route path='/contact-us' element={<Contact notify={notify} setToken={setToken} errorMessage={errorMessage} />} />

            </Route>

            {/*               <Route path="changepass/:userid/:token" element={<ChangePass notify={notify} setToken={setToken} errorMessage={errorMessage} />} />
              <Route path="forgotpass" element={<ForgotPass notify={notify} setToken={setToken} errorMessage={errorMessage} />} />
               */}


            {/* <Route path="admin/:categoryid?/:itemid?" element={token ? <Admin queryClient={queryClient} categories={result.data} notify={notify} setToken={setToken} errorMessage={errorMessage} /> : <Navigate replace to="/" />} />

            <Route path="admin" element={<Admin />}>
              <Route path="items/:categoryid?/:itemid?" element={<AdminItems />} />
              <Route path="orders/:orderid?" element={<AdminOrders />} />
            </Route> */}


          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;