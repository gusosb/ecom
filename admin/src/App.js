import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, Suspense, lazy, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getCategories, baseUrl, addNotify } from './requests';

const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const Orders = lazy(() => import('./components/Orders'));
const Home = lazy(() => import('./components/Home'));
const Items = lazy(() => import('./components/Items'));

const App = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    enabled: !!token, // only run the query if the token is available
    refetchOnWindowFocus: false,
    onError: (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('gustaflund-bunny-racer-admin');
        setToken(null);
      }
    }
  });

  useEffect(() => {
    const localtoken = localStorage.getItem('gustaflund-bunny-racer-admin');
    if (localtoken && localtoken !== 'undefined') setToken(localtoken);
    setLoading(false);
  }, []);

  console.log('token', token);

  if (loading || isCategoriesLoading) return <div>Loading...</div>;

  return (
    <>
      <Router>
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/" element={token ? <Home /> : <Navigate replace to="/login" />}>
              <Route path="/orders" element={<Orders />} />
              <Route path="/items" element={<Items />} />
            </Route>

            <Route path="/login" element={token ? <Navigate replace to="/" /> : <Login setToken={setToken} />} />
            <Route path="/register" element={!token ? <Register setToken={setToken} /> : <Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
