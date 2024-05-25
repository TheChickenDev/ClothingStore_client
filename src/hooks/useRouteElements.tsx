import { useContext } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import DefaultLayout from 'src/components/DefaultLayout'
import paths from 'src/constants/paths'
import { AppContext } from 'src/contexts/app.context'
import About from 'src/pages/About'
import Cart from 'src/pages/Cart'
import Contact from 'src/pages/Contact'
import ForgotPassword from 'src/pages/ForgotPassword'
import Home from 'src/pages/Home'
import Login from 'src/pages/Login'
import Orders from 'src/pages/Orders'
import Product from 'src/pages/Product'
import Profile from 'src/pages/Profile'
import Register from 'src/pages/Register'
import Shop from 'src/pages/Shop'

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={paths.login} />
}

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Navigate to={paths.home} /> : <Outlet />
}

const routes: RouteObject[] = [
  {
    path: paths.home,
    element: (
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    ),
    index: true
  },
  {
    path: paths.shop,
    element: (
      <DefaultLayout>
        <Shop />
      </DefaultLayout>
    )
  },
  {
    path: paths.product,
    element: (
      <DefaultLayout>
        <Product />
      </DefaultLayout>
    )
  },
  {
    path: paths.about,
    element: (
      <DefaultLayout>
        <About />
      </DefaultLayout>
    )
  },
  {
    path: paths.contact,
    element: (
      <DefaultLayout>
        <Contact />
      </DefaultLayout>
    )
  },
  {
    path: '',
    element: <RejectedRoute />,
    children: [
      {
        path: paths.login,
        element: <Login />
      },
      {
        path: paths.register,
        element: <Register />
      },
      {
        path: paths.forgotPassword,
        element: <ForgotPassword />
      }
    ]
  },
  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: paths.profile,
        element: (
          <DefaultLayout>
            <Profile />
          </DefaultLayout>
        )
      },
      {
        path: paths.cart,
        element: (
          <DefaultLayout>
            <Cart />
          </DefaultLayout>
        )
      },
      {
        path: paths.orders,
        element: (
          <DefaultLayout>
            <Orders />
          </DefaultLayout>
        )
      }
    ]
  }
]

const useRouteElements = () => useRoutes(routes)
export default useRouteElements
