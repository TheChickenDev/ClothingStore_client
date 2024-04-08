import { createContext, useState } from 'react'
import { userImg } from 'src/assets/images'
import languages from 'src/constants/languages'
import {
  getAccessTokenFromLocalStorage,
  getThemeFromLocalStorage,
  getUserAvatarFromLocalStorage,
  getUserEmailFromLocalStorage
} from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  userEmail: string
  setUserEmail: React.Dispatch<React.SetStateAction<string>>
  userAvatar: string
  setUserAvatar: React.Dispatch<React.SetStateAction<string>>
  darkTheme: boolean
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>
  language: string
  setLanguage: React.Dispatch<React.SetStateAction<string>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  userEmail: getUserEmailFromLocalStorage(),
  setUserEmail: () => null,
  userAvatar: getUserAvatarFromLocalStorage() || userImg.defaultAvatar,
  setUserAvatar: () => null,
  darkTheme: getThemeFromLocalStorage(),
  setDarkTheme: () => null,
  language: languages.vietnamese,
  setLanguage: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [userEmail, setUserEmail] = useState<string>(initialAppContext.userEmail)
  const [userAvatar, setUserAvatar] = useState<string>(initialAppContext.userAvatar)
  const [darkTheme, setDarkTheme] = useState<boolean>(initialAppContext.darkTheme)
  const [language, setLanguage] = useState<string>(initialAppContext.language)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userEmail,
        setUserEmail,
        userAvatar,
        setUserAvatar,
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
