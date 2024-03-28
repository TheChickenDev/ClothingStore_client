import { faSun } from '@fortawesome/free-regular-svg-icons'
import { faCaretDown, faEarthAsia, faEarthEurope, faMoon, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { logoImg } from 'src/assets/images'
import languages from 'src/constants/languages'
import paths from 'src/constants/paths'
import { AppContext } from 'src/contexts/app.context'
import { saveLanguageToLocalStorage, saveThemeToLocalStorage } from 'src/utils/auth'

export default function Header() {
  const { isAuthenticated, userData, darkTheme, setDarkTheme, language, setLanguage } = useContext(AppContext)

  const handleChangeThemeClick = () => {
    saveThemeToLocalStorage(!darkTheme)
    setDarkTheme(!darkTheme)
  }

  const handleChangeLanguage = () => {
    if (language === languages.vietnamese) {
      saveLanguageToLocalStorage(languages.english)
      setLanguage(languages.english)
    } else {
      saveLanguageToLocalStorage(languages.vietnamese)
      setLanguage(languages.vietnamese)
    }
  }

  return (
    <div className=' bg-blackPrimary'>
      <div className='flex justify-between items-center max-w-7xl m-auto py-4'>
        <Link to={paths.home}>
          <img src={logoImg.logo} alt='logo' className='block h-20' />
        </Link>
        <div className='flex justify-center items-center gap-2'>
          <button className='text-lg text-white p-3' onClick={handleChangeThemeClick}>
            {!darkTheme ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
          </button>
          <button className='flex justify-center items-center text-sm text-white p-3' onClick={handleChangeLanguage}>
            {language === languages.vietnamese ? (
              <>
                <FontAwesomeIcon icon={faEarthAsia} className='mr-2 text-lg' />
                Tiếng Việt
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faEarthEurope} className='mr-2 text-lg' />
                English
              </>
            )}
            <FontAwesomeIcon icon={faCaretDown} className='ml-2 text-lg' />
          </button>
          <div className='flex justify-center items-center text-sm text-white pl-3'>
            {isAuthenticated ? (
              <div>{userData?.email}</div>
            ) : (
              <div className='flex justify-center items-center gap-2'>
                <Link to={paths.login} className='flex justify-center items-center py-3'>
                  <FontAwesomeIcon icon={faRightToBracket} className='mr-2 text-lg' />
                  Đăng nhập
                </Link>
                <div className='h-4 w-[1px] bg-white/50'></div>
                <Link to={paths.login} className='flex justify-center items-center py-3'>
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
      <div className='flex justify-between items-center max-w-7xl m-auto py-2'>
        <div className='flex justify-between items-center gap-4 text-white text-sm'>
          <Link to={paths.home} className='p-2 hoverHeaderBtn'>
            Trang chủ
          </Link>
          <Link to={paths.about} className='p-2 hoverHeaderBtn'>
            Về chúng tôi
          </Link>
          <Link to={paths.contact} className='p-2 hoverHeaderBtn'>
            Liên hệ
          </Link>
          <Link to={paths.faq} className='p-2 hoverHeaderBtn'>
            FAQ
          </Link>
        </div>
        <form className='flex justify-center items-center bg-white rounded-sm overflow-hidden'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='w-60 text-sm p-2 outline-none focus:placeholder-yellowPrimary'
          />
          <button className='p-2 hoverChangeTextColor'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-lg' />
          </button>
        </form>
      </div>
    </div>
  )
}
