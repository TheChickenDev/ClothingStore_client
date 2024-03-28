import type { RouteObject } from 'react-router-dom'
import { Outlet, useRoutes } from 'react-router-dom'
import DefaultLayout from 'src/components/DefaultLayout'
import paths from 'src/constants/paths'
import Home from 'src/pages/Home'
import Login from 'src/pages/Login'
import Profile from 'src/pages/Profile'
import Register from 'src/pages/Register'

const ProtectedRoute = () => {
  // const { isAuthenticated } = useContext(AppContext)
  // return isAuthenticated ? <Outlet /> : <Navigate to={paths.login} />
  return <Outlet />
}

const RejectedRoute = () => {
  // const { isAuthenticated } = useContext(AppContext)
  // return isAuthenticated ? <Navigate to={paths.home} /> : <Outlet />
  return <Outlet />
}

const routes: RouteObject[] = [
  {
    path: paths.home,
    element: (
      <DefaultLayout>
        <Home />
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
      }
    ]
  },
  {
    path: '',
    element: <ProtectedRoute />,
    children: [{ path: paths.profile, element: <Profile /> }]
  }
]

const useRouteElements = () => useRoutes(routes)
export default useRouteElements
