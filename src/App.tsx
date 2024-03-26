import useRouteElements from './hooks/useRouteElements'

function App() {
  const routes = useRouteElements()
  return <>{routes}</>
}

export default App
