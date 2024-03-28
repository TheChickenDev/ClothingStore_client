import { createContext, useState } from 'react'
import languages from 'src/constants/languages'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLocalStorage, getThemeFromLocalStorage, getUserDataFromLocalStorage } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  userData: User | null
  setUserData: React.Dispatch<React.SetStateAction<User | null>>
  darkTheme: boolean
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>
  language: string
  setLanguage: React.Dispatch<React.SetStateAction<string>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  userData: getUserDataFromLocalStorage(),
  setUserData: () => null,
  darkTheme: getThemeFromLocalStorage(),
  setDarkTheme: () => null,
  language: languages.vietnamese,
  setLanguage: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [userData, setUserData] = useState<User | null>(initialAppContext.userData)
  const [darkTheme, setDarkTheme] = useState<boolean>(initialAppContext.darkTheme)
  const [language, setLanguage] = useState<string>(initialAppContext.language)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userData,
        setUserData,
        darkTheme,
        setDarkTheme,
        language,
        setLanguage
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
