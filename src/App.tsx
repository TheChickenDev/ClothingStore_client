import useRouteElements from './hooks/useRouteElements'
import { ToastContainer } from 'react-toastify'

function App() {
  const routes = useRouteElements()
  return (
    <>
      {routes}
      <ToastContainer />
    </>
  )
}

export default App
