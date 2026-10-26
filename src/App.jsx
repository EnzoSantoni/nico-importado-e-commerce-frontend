import './index.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import AdminProduct from './pages/admin-product/AdminProduct'
import ProductDetail from './pages/product-detail/ProductDetail'
import { Route, Routes } from 'react-router'
import AdminGuard from './service/guard/AdminGuard'
import Register from './pages/register/Register'
import AdminUser from './pages/admin-user/AdminUser'
import Contact from './pages/contact/Contact'
import AboutUs from './pages/about-us/AboutUs'
import NotFound from './pages/not-found/NotFound'
import Layout from './layout/Layout'

function App() {

  return (
    <>
      
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/'  element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='contact' element={<Contact />} />
            <Route path='register' element={<Register />}/>
            <Route path='about-us' element={<AboutUs />} />
            {/* Ruta con params */}
            <Route path='product-detail/:id' element={<ProductDetail />} />
            
            {/* Ruta protegida */}
            <Route path='admin-product' element={
              <AdminGuard>
                {/* Componente hijo: children */}
                <AdminProduct />
              </AdminGuard>
            } />
            <Route path='admin-user' element={
              <AdminGuard>
                <AdminUser />
              </AdminGuard>
            } />
            <Route path='*' element={<NotFound />} />
            
          </Route>

        </Routes>


      
    </>
  )
}

export default App
