import { createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLocalStorage, getUserDataFromLocalStorage } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  userData: User
  setUserData: React.Dispatch<React.SetStateAction<User>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  userData: getUserDataFromLocalStorage(),
  setUserData: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [userData, setUserData] = useState<User>(initialAppContext.userData)

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
