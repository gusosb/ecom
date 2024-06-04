import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAdminCategories } from '../requests';

const AdminItems = lazy(() => import('./AdminItems'));
const AdminOrders = lazy(() => import('./AdminOrders'));

const Admin = () => {
  const result = useQuery(['admincategories'], getAdminCategories, {
    refetchOnWindowFocus: false
  });
  const queryClient = useQueryClient();

  return (
    <>
      <Suspense fallback={<></>}>
        <Routes>
          {/* <Route path="/" element={<Admin />} /> */}
          <Route path="items/:categoryid?/:itemid?" element={result.data && <AdminItems queryClient={queryClient} categories={result.data} />} />
          <Route path="orders" element={<AdminOrders queryClient={queryClient} categories={result.data} />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Admin;
