import { ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import useRouteElements from './hooks/useRouteElements'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const routes = useRouteElements()

  return (
    <>
      <ScrollToTop />
      {routes}
      <ToastContainer />
    </>
  )
}

export default App
