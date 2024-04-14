import { faSun, faUser } from '@fortawesome/free-regular-svg-icons'
import {
  faAngleRight,
  faBagShopping,
  faCaretDown,
  faEarthAsia,
  faEarthEurope,
  faMoon,
  faSignOut,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { removeDataFromLocalStorage, saveLanguageToLocalStorage, saveThemeToLocalStorage } from 'src/utils/auth'
import { cartImg, headerImg, logoImg } from 'src/assets/images'
import languages from 'src/constants/languages'
import { AppContext } from 'src/contexts/app.context'
import paths from 'src/constants/paths'
import Popover from '../Popover'
import PopoverMobile from '../PopoverMobile/PopoverMobile'

export default function Header() {
  const { isAuthenticated, setIsAuthenticated, userEmail, userAvatar, darkTheme, setDarkTheme, language, setLanguage } =
    useContext(AppContext)
  const [openLanguagePopover, setOpenLanguagePopover] = useState<boolean>(false)
  const [openUserPopover, setOpenUserPopover] = useState<boolean>(false)
  const [openCartPopover, setOpenCartPopover] = useState<boolean>(false)
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false)
  const [openMobileLanguagePopover, setOpenMobileLanguagePopover] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleChangeTheme = () => {
    saveThemeToLocalStorage(!darkTheme)
    setDarkTheme(!darkTheme)
  }

  const handleChangeLanguage = (language: string) => {
    saveLanguageToLocalStorage(language)
    setLanguage(language)
    setOpenMobileLanguagePopover(false)
    setOpenLanguagePopover(false)
  }

  const handleLogout = () => {
    toast.success('Đăng xuất thành công!')
    setIsAuthenticated(false)
    navigate(paths.login)
    removeDataFromLocalStorage()
  }

  const handleMobileLogoNavigate = () => {
    setOpenMobileMenu(false)
    navigate(paths.home)
  }

  return (
    <div className='bg-white fixed top-0 left-0 right-0 z-50 shadow-lg'>
      <div className='flex justify-between items-center m-auto py-2 lg:px-32 md:px-16 px-4'>
        <Link to={paths.home}>
          <img src={logoImg.logo} alt='logo' className='block h-20' />
        </Link>
        <div className='flex-1 hidden xl:flex justify-between items-center gap-2'>
          <div className='flex justify-between items-center gap-4 text-black text-sm'>
            <Link to={paths.home} className='p-2 header-btn'>
              Trang chủ
            </Link>
            <Link to={paths.shop} className='p-2 header-btn'>
              Shop
            </Link>
            <Link to={paths.about} className='p-2 header-btn'>
              Về chúng tôi
            </Link>
            <Link to={paths.contact} className='p-2 header-btn'>
              Liên hệ
            </Link>
          </div>
          <div className='flex justify-center items-center gap-4'>
            <form className='flex justify-center items-center rounded-lg  bg-white border border-yellow-primary overflow-hidden'>
              <input
                type='text'
                placeholder='Tìm kiếm...'
                className='w-48 text-sm p-2 outline-none focus:placeholder-yellow-primary'
              />
              <button className='p-2 duration-200 hover:text-yellow-primary'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='text-lg' />
              </button>
            </form>
            <button
              className='text-2xl text-black w-8 h-8 duration-200 hover:text-yellow-primary relative'
              onClick={handleChangeTheme}
            >
              <AnimatePresence>
                {!darkTheme && (
                  <motion.div
                    initial={{ opacity: 0, rotate: 0, scale: 0 }}
                    animate={{ opacity: 1, rotate: [0, 360], scale: 1 }}
                    exit={{ opacity: 0, rotate: [0, 360], scale: 0 }}
                    className='w-full h-full'
                  >
                    <FontAwesomeIcon icon={faSun} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {darkTheme && (
                  <motion.div
                    initial={{ opacity: 0, rotate: 0, scale: 0 }}
                    animate={{ opacity: 1, rotate: [0, 360], scale: 1 }}
                    exit={{ opacity: 0, rotate: [0, 360], scale: 0 }}
                    className='absolute inset-0'
                  >
                    <FontAwesomeIcon icon={faMoon} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <div
              className='flex justify-center items-center py-3 relative text-black duration-200 pointer hover:text-yellow-primary'
              onMouseEnter={() => setOpenLanguagePopover(true)}
              onMouseLeave={() => setOpenLanguagePopover(false)}
            >
              {language === languages.vietnamese ? (
                <FontAwesomeIcon icon={faEarthAsia} className='mr-2 text-2xl' />
              ) : (
                <FontAwesomeIcon icon={faEarthEurope} className='mr-2 text-2xl' />
              )}
              <FontAwesomeIcon icon={faCaretDown} className='text-lg' />
              <Popover isOpened={openLanguagePopover} positionX='left' positionY='bottom'>
                <div className='text-black-primary text-left bg-white shadow-md rounded-md min-w-48 overflow-hidden'>
                  <button
                    className='block p-2 hover:bg-yellow-primary/30 w-full text-start'
                    onClick={() => handleChangeLanguage(languages.vietnamese)}
                  >
                    <FontAwesomeIcon icon={faEarthAsia} className='text-lg mr-2' />
                    Tiếng Việt
                  </button>
                  <button
                    className='block p-2 hover:bg-yellow-primary/30 w-full text-start'
                    onClick={() => handleChangeLanguage(languages.english)}
                  >
                    <FontAwesomeIcon icon={faEarthEurope} className='text-lg mr-2' />
                    English
                  </button>
                </div>
              </Popover>
            </div>
            <div className='flex justify-center items-center gap-4 text-sm text-black'>
              {isAuthenticated ? (
                <>
                  <div
                    className='relative py-2 duration-200 pointer hover:text-yellow-primary'
                    onMouseEnter={() => setOpenUserPopover(true)}
                    onMouseLeave={() => setOpenUserPopover(false)}
                  >
                    <div className='w-10 h-10 rounded-[50%] overflow-hidden border'>
                      <img src={userAvatar} alt='avatar' className='block w-full h-full' />
                    </div>
                    <Popover isOpened={openUserPopover} positionX='right' positionY='bottom'>
                      <div className='text-black-primary text-left bg-white shadow-md rounded-md min-w-48 overflow-hidden'>
                        <p className='w-full p-2'>{userEmail}</p>
                        <hr />
                        <Link to={paths.profile} className='block p-2 hover:bg-yellow-primary/30 w-full text-start'>
                          <FontAwesomeIcon icon={faUser} className='text-lg mr-2' />
                          Hồ sơ của tôi
                        </Link>
                        <button
                          className='block p-2 hover:bg-yellow-primary/30 w-full text-start'
                          onClick={handleLogout}
                        >
                          Đăng xuất
                          <FontAwesomeIcon icon={faSignOut} className='text-lg ml-2' />
                        </button>
                      </div>
                    </Popover>
                  </div>
                  <div
                    className='relative py-2 duration-200 pointer hover:text-yellow-primary'
                    onMouseEnter={() => setOpenCartPopover(true)}
                    onMouseLeave={() => setOpenCartPopover(false)}
                  >
                    <FontAwesomeIcon icon={faBagShopping} className='text-4xl' />
                    <Popover isOpened={openCartPopover} positionX='right' positionY='bottom'>
                      <div className='text-black-primary text-left bg-white shadow-md rounded-md min-w-48 overflow-hidden'>
                        <img src={cartImg.emptyCart} alt='emptyCart' />
                        <p className='w-full text-center p-2'>{'Giỏ hàng trống! :<'}</p>
                      </div>
                    </Popover>
                  </div>
                </>
              ) : (
                <div className='flex justify-center items-center gap-2'>
                  <Link
                    to={paths.login}
                    className='flex justify-center items-center py-3 duration-200 pointer hover:text-yellow-primary'
                  >
                    Đăng nhập
                  </Link>
                  <div className='h-4 border-l border-l-black'></div>
                  <Link
                    to={paths.register}
                    className='flex justify-center items-center py-3 duration-200 pointer hover:text-yellow-primary'
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex xl:hidden justify-center items-center gap-4'>
          <button
            className='relative text-2xl w-8 h-8 text-black transition-colors duration-300 hover:text-yellow-primary'
            onClick={handleChangeTheme}
          >
            <AnimatePresence>
              {!darkTheme && (
                <motion.div
                  initial={{ opacity: 0, rotate: 0, scale: 0 }}
                  animate={{ opacity: 1, rotate: [0, 360], scale: 1 }}
                  exit={{ opacity: 0, rotate: [0, 360], scale: 0 }}
                  className='w-full h-full'
                >
                  <FontAwesomeIcon icon={faSun} />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {darkTheme && (
                <motion.div
                  initial={{ opacity: 0, rotate: 0, scale: 0 }}
                  animate={{ opacity: 1, rotate: [0, 360], scale: 1 }}
                  exit={{ opacity: 0, rotate: [0, 360], scale: 0 }}
                  className='absolute inset-0'
                >
                  <FontAwesomeIcon icon={faMoon} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <button className='group relative w-8 h-8' onClick={() => setOpenMobileMenu(true)}>
            <span className='block absolute top-1/4 left-0 w-3/4 border-b-2 border-b-black duration-300 group-hover:border-b-yellow-primary group-hover:left-1/2'></span>
            <span className='block absolute top-1/2 left-1/3 w-1/3 border-b-[3px] border-b-black duration-300 group-hover:border-b-yellow-primary'></span>
            <span className='block absolute top-3/4 left-1/4 w-3/4 border-b-[3px] border-b-black duration-300 group-hover:border-b-yellow-primary group-hover:-left-1/4'></span>
          </button>
        </div>
      </div>
      {openMobileMenu && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black-layer/70'></div>}
      <AnimatePresence>
        {openMobileMenu && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{
              x: [300, 0],
              opacity: 1,
              transition: { duration: 0.1, type: 'tween' }
            }}
            exit={{ x: [0, 300], opacity: 0 }}
            className='fixed lg:w-1/3 sm:w-1/2 w-full top-0 bottom-0 right-0 bg-white px-12 py-8 duration-300'
          >
            <div className='flex justify-between items-center'>
              <button onClick={handleMobileLogoNavigate}>
                <img src={logoImg.logo} alt='Logo' className='block w-24 h-20' />
              </button>
              <button
                className='rounded-full border border-gray-300 w-16 h-16 transition-colors duration-300 hover:border-pink-primary hover:bg-pink-primary hover:text-white'
                onClick={() => setOpenMobileMenu(false)}
              >
                <FontAwesomeIcon icon={faXmark} className='text-3xl' />
              </button>
            </div>
            <div className='text-black mt-4'>
              <Link to={paths.home} className='block w-full py-3 header-btn'>
                Trang chủ
              </Link>
              <hr />
              <Link to={paths.shop} className='block w-full py-3 header-btn'>
                Shop
              </Link>
              <hr />
              <Link to={paths.about} className='block w-full py-3 header-btn'>
                Về chúng tôi
              </Link>
              <hr />
              <Link to={paths.contact} className='block w-full py-3 header-btn'>
                Liên hệ
              </Link>
              <hr />
            </div>
            <div className='text-black py-2'>
              {language === languages.vietnamese ? (
                <button
                  className='duration-200 pointer hover:text-yellow-primary'
                  onClick={() => setOpenMobileLanguagePopover(!openMobileLanguagePopover)}
                >
                  <FontAwesomeIcon icon={faEarthAsia} className='mr-2 text-lg' />
                  Tiếng Việt
                  <FontAwesomeIcon icon={faCaretDown} className='ml-2 text-lg' />
                </button>
              ) : (
                <button
                  className='duration-200 pointer hover:text-yellow-primary'
                  onClick={() => setOpenMobileLanguagePopover(!openMobileLanguagePopover)}
                >
                  <FontAwesomeIcon icon={faEarthEurope} className='mr-2 text-lg' />
                  English
                  <FontAwesomeIcon icon={faCaretDown} className='ml-2 text-lg' />
                </button>
              )}
              <PopoverMobile isOpened={openMobileLanguagePopover}>
                <div className='text-black-primary text-left'>
                  <div className='text-end border-b-2 border-b-black-primary/30'>
                    <button
                      className='p-4 text-black-primary text-4xl duration-200 pointer hover:text-yellow-primary'
                      onClick={() => setOpenMobileLanguagePopover(false)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                  <button
                    className='flex justify-start items-center w-full p-4 hover:bg-yellow-primary/50'
                    onClick={() => handleChangeLanguage(languages.vietnamese)}
                  >
                    <FontAwesomeIcon icon={faEarthAsia} className='text-lg mr-2' />
                    Tiếng Việt
                  </button>
                  <button
                    className='flex justify-start items-center w-full p-4 hover:bg-yellow-primary/50'
                    onClick={() => handleChangeLanguage(languages.english)}
                  >
                    <FontAwesomeIcon icon={faEarthEurope} className='text-lg mr-2' />
                    English
                  </button>
                </div>
              </PopoverMobile>
            </div>
            <hr />
            <form className='flex justify-center items-center rounded-lg bg-white border border-yellow-primary overflow-hidden mt-2'>
              <input
                type='text'
                placeholder='Tìm kiếm...'
                className='flex-1 text-sm p-2 outline-none focus:placeholder-yellow-primary'
              />
              <button className='p-2 duration-200 hover:text-yellow-primary'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='text-lg' />
              </button>
            </form>
            <div className='text-sm text-black mt-28'>
              {isAuthenticated ? (
                <>
                  <div className='flex justify-between items-center'>
                    <div className='py-2'>
                      <p className='text-sm'>{userEmail}</p>
                    </div>
                  </div>
                  <hr />
                  <div className=''>
                    <Link to={paths.profile} className='block py-2 duration-200 pointer hover:text-yellow-primary'>
                      <FontAwesomeIcon icon={faBagShopping} className='text-lg mr-2' />
                      Giỏ hàng
                    </Link>
                    <Link to={paths.profile} className='block py-2 duration-200 pointer hover:text-yellow-primary'>
                      <FontAwesomeIcon icon={faUser} className='text-lg mr-2' />
                      Hồ sơ của tôi
                    </Link>
                    <button
                      className='block py-2 duration-200 pointer hover:text-yellow-primary'
                      onClick={handleLogout}
                    >
                      Đăng xuất
                      <FontAwesomeIcon icon={faSignOut} className='text-lg ml-2' />
                    </button>
                  </div>
                </>
              ) : (
                <div className='flex justify-between items-center'>
                  <Link
                    to={paths.login}
                    className='block px-8 py-3 bg-pink-primary text-white hover:bg-purple-primary duration-300'
                  >
                    Bắt đầu ngay
                    <FontAwesomeIcon icon={faAngleRight} className='ml-1 text-lg' />
                  </Link>
                </div>
              )}
            </div>
            <div className='absolute left-0 bottom-0 right-0 -z-10'>
              <img src={headerImg.headerMobileBg} alt='Mobile Background' className='block w-full' />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
