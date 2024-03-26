import type { RouteObject } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import paths from 'src/constants/paths'
import Home from 'src/pages/Home'
import Login from 'src/pages/Login'
import Register from 'src/pages/Register'

const routes: RouteObject[] = [
  {
    path: paths.home,
    element: <Home />
  },
  {
    path: paths.login,
    element: <Login />
  },
  {
    path: paths.register,
    element: <Register />
  }
]

const useRouteElements = () => useRoutes(routes)
export default useRouteElements
