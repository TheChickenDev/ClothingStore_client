import { faCircleUser, faSun, faUser } from '@fortawesome/free-regular-svg-icons'
import {
  faBagShopping,
  faBars,
  faCaretDown,
  faEarthAsia,
  faEarthEurope,
  faMoon,
  faRightToBracket,
  faSignOut,
  faUserPlus,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { removeDataFromLocalStorage, saveLanguageToLocalStorage, saveThemeToLocalStorage } from 'src/utils/auth'
import { cartImg, logoImg } from 'src/assets/images'
import languages from 'src/constants/languages'
import { AppContext } from 'src/contexts/app.context'
import paths from 'src/constants/paths'
import Popover from '../Popover'
import PopoverMobile from '../PopoverMobile/PopoverMobile'

export default function Header() {
  const { isAuthenticated, setIsAuthenticated, userEmail, darkTheme, setDarkTheme, language, setLanguage } =
    useContext(AppContext)
  const [openLanguagePopover, setOpenLanguagePopover] = useState<boolean>(false)
  const [openUserPopover, setOpenUserPopover] = useState<boolean>(false)
  const [openCartPopover, setOpenCartPopover] = useState<boolean>(false)
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false)
  const [openMobileLanguagePopover, setOpenMobileLanguagePopover] = useState<boolean>(false)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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

  return (
    <div className='bg-blackPrimary'>
      {width >= 640 ? (
        <>
          <div className='flex justify-between items-center lg:max-w-7xl m-auto py-4 lg:px-24 md:px-16 px-8'>
            <Link to={paths.home}>
              <img src={logoImg.logo} alt='logo' className='block h-20' />
            </Link>
            <div className='flex justify-center items-center gap-2'>
              <div className='flex justify-center items-center gap-2'>
                <button
                  className='text-xl text-white w-8 h-7 hoverChangeTextColor relative'
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
                        className='w-full absolute top-0 left-0'
                      >
                        <FontAwesomeIcon icon={faMoon} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
                <div
                  className='flex justify-center items-center text-sm p-3 relative text-white hoverChangeTextColor'
                  onMouseEnter={() => setOpenLanguagePopover(true)}
                  onMouseLeave={() => setOpenLanguagePopover(false)}
                >
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
                  <Popover isOpened={openLanguagePopover} position='left'>
                    <div className='text-black text-left bg-white shadow-md rounded-md min-w-48 overflow-hidden'>
                      <button
                        className='flex justify-start items-center p-2 hover:bg-yellowPrimary/50 w-full'
                        onClick={() => handleChangeLanguage(languages.vietnamese)}
                      >
                        <FontAwesomeIcon icon={faEarthAsia} className='text-lg mr-2' />
                        Tiếng Việt
                      </button>
                      <button
                        className='flex justify-start items-center p-2 hover:bg-yellowPrimary/50 w-full'
                        onClick={() => handleChangeLanguage(languages.english)}
                      >
                        <FontAwesomeIcon icon={faEarthEurope} className='text-lg mr-2' />
                        English
                      </button>
                    </div>
                  </Popover>
                </div>
              </div>
              <div className='flex justify-center items-center gap-4 text-sm text-white pl-3'>
                {isAuthenticated ? (
                  <>
                    <div
                      className='relative py-2 hoverChangeTextColor'
                      onMouseEnter={() => setOpenUserPopover(true)}
                      onMouseLeave={() => setOpenUserPopover(false)}
                    >
                      <FontAwesomeIcon icon={faCircleUser} className='text-4xl mr-2' />
                      <Popover isOpened={openUserPopover} position='right'>
                        <div className='text-black text-left bg-white shadow-md rounded-md min-w-48 overflow-hidden'>
                          <p className='w-full p-2'>{userEmail}</p>
                          <hr />
                          <Link
                            to={paths.profile}
                            className='flex justify-start items-center p-2 hover:bg-yellowPrimary/50 w-full'
                          >
                            <FontAwesomeIcon icon={faUser} className='text-lg mr-2' />
                            Hồ sơ của tôi
                          </Link>
                          <button
                            className='flex justify-start items-center p-2 hover:bg-yellowPrimary/50 w-full'
                            onClick={handleLogout}
                          >
                            Đăng xuất
                            <FontAwesomeIcon icon={faSignOut} className='text-lg ml-2' />
                          </button>
                        </div>
                      </Popover>
                    </div>
                    <div
                      className='relative py-2 hoverChangeTextColor'
                      onMouseEnter={() => setOpenCartPopover(true)}
                      onMouseLeave={() => setOpenCartPopover(false)}
                    >
                      <FontAwesomeIcon icon={faBagShopping} className='text-4xl' />
                      <Popover isOpened={openCartPopover} position={'right'}>
                        <div className='text-black text-left bg-white shadow-md rounded-md min-w-48 overflow-hidden'>
                          <img src={cartImg.emptyCart} alt='emptyCart' />
                          <p className='w-full text-center p-2'>{'Giỏ hàng trống! :<'}</p>
                        </div>
                      </Popover>
                    </div>
                  </>
                ) : (
                  <div className='flex justify-center items-center gap-2'>
                    <Link to={paths.login} className='flex justify-center items-center py-3 hoverChangeTextColor'>
                      <FontAwesomeIcon icon={faRightToBracket} className='mr-2 text-lg' />
                      Đăng nhập
                    </Link>
                    <div className='h-4 w-[1px] bg-white/50'></div>
                    <Link to={paths.register} className='flex justify-center items-center py-3 hoverChangeTextColor'>
                      Đăng ký
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <hr />
          <div className='flex justify-between items-center lg:max-w-7xl m-auto py-2 lg:px-24 md:px-16 px-8'>
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
                className='w-48 text-sm p-2 outline-none focus:placeholder-yellowPrimary'
              />
              <button className='p-2 hoverChangeTextColor'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='text-lg' />
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className='relative py-2 mx-4'>
            <Link to={paths.home} className='block w-fit'>
              <img src={logoImg.logo} alt='logo' className='block h-16' />
            </Link>
            <button
              className='text-3xl text-white w-12 h-16 absolute top-2 right-14 hoverChangeTextColor'
              onClick={handleChangeTheme}
            >
              <AnimatePresence>
                {!darkTheme && (
                  <motion.div
                    initial={{ opacity: 0, rotate: 0, scale: 0 }}
                    animate={{ opacity: 1, rotate: [0, 360], scale: 1 }}
                    exit={{ opacity: 0, rotate: [0, 360], scale: 0 }}
                    className='absolute top-4 left-3'
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
                    className='absolute top-4 left-3'
                  >
                    <FontAwesomeIcon icon={faMoon} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <button
              className='text-3xl text-white w-12 h-16 absolute top-2 right-0 hoverChangeTextColor'
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
            >
              <AnimatePresence>
                {!openMobileMenu && (
                  <motion.div
                    initial={{ opacity: 0, rotate: 0, scale: 0 }}
                    animate={{ opacity: 1, rotate: [180, 360], scale: 1 }}
                    exit={{ opacity: 0, rotate: [180, 360], scale: 0 }}
                    className='absolute top-4 left-3'
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </motion.div>
                )}
              </AnimatePresence>
              {openMobileMenu && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, rotate: 0, scale: 0 }}
                    animate={{ opacity: 1, rotate: [180, 360], scale: 1 }}
                    exit={{ opacity: 0, rotate: [180, 360], scale: 0 }}
                    className='absolute top-4 left-3'
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </motion.div>
                </AnimatePresence>
              )}
            </button>
          </div>
          <AnimatePresence>
            {openMobileMenu && (
              <motion.div
                initial={{ x: 0, opacity: 0 }}
                animate={{
                  x: [300, 0],
                  opacity: 1
                }}
                exit={{ x: 0, opacity: 0 }}
                className='fixed top-20 left-0 bottom-0 right-0 bg-blackPrimary'
              >
                <hr />
                <div className='text-sm text-white mx-6'>
                  {isAuthenticated ? (
                    <>
                      <div className='flex justify-between items-center w-full'>
                        <div className='py-2'>
                          <p className='text-sm'>{userEmail}</p>
                        </div>
                        <div
                          className='relative py-2 hoverChangeTextColor'
                          onMouseEnter={() => setOpenCartPopover(true)}
                          onMouseLeave={() => setOpenCartPopover(false)}
                        >
                          <FontAwesomeIcon icon={faBagShopping} className='text-4xl' />
                        </div>
                      </div>
                      <hr />
                      <div className='flex justify-between items-center w-full'>
                        <Link to={paths.profile} className='flex justify-start items-center py-2 hoverChangeTextColor'>
                          <FontAwesomeIcon icon={faUser} className='text-lg mr-2' />
                          Hồ sơ của tôi
                        </Link>
                        <button
                          className='flex justify-start items-center py-2 hoverChangeTextColor'
                          onClick={handleLogout}
                        >
                          Đăng xuất
                          <FontAwesomeIcon icon={faSignOut} className='text-lg ml-2' />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className='flex justify-between items-center'>
                      <Link to={paths.login} className='flex justify-center items-center py-3 hoverChangeTextColor'>
                        <FontAwesomeIcon icon={faRightToBracket} className='mr-2 text-lg' />
                        Đăng nhập
                      </Link>
                      <Link to={paths.register} className='flex justify-center items-center py-3 hoverChangeTextColor'>
                        <FontAwesomeIcon icon={faUserPlus} className='mr-2 text-lg' />
                        Đăng ký
                      </Link>
                    </div>
                  )}
                </div>
                <hr />
                <div className='flex justify-between items-center text-white mx-6 py-2'>
                  <p className='text-sm'>Ngôn ngữ</p>
                  {language === languages.vietnamese ? (
                    <button
                      className='hoverChangeTextColor'
                      onClick={() => setOpenMobileLanguagePopover(!openMobileLanguagePopover)}
                    >
                      <FontAwesomeIcon icon={faEarthAsia} className='mr-2 text-lg' />
                      Tiếng Việt
                      <FontAwesomeIcon icon={faCaretDown} className='ml-2 text-lg' />
                    </button>
                  ) : (
                    <button
                      className='hoverChangeTextColor'
                      onClick={() => setOpenMobileLanguagePopover(!openMobileLanguagePopover)}
                    >
                      <FontAwesomeIcon icon={faEarthEurope} className='mr-2 text-lg' />
                      English
                      <FontAwesomeIcon icon={faCaretDown} className='ml-2 text-lg' />
                    </button>
                  )}
                  <PopoverMobile isOpened={openMobileLanguagePopover}>
                    <div className='text-black text-left'>
                      <div className='text-end border-b-2 border-b-black/30'>
                        <button
                          className='p-4 text-black text-4xl hoverChangeTextColor'
                          onClick={() => setOpenMobileLanguagePopover(false)}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                      <button
                        className='flex justify-start items-center p-4 hover:bg-yellowPrimary/50 w-full'
                        onClick={() => handleChangeLanguage(languages.vietnamese)}
                      >
                        <FontAwesomeIcon icon={faEarthAsia} className='text-lg mr-2' />
                        Tiếng Việt
                      </button>
                      <button
                        className='flex justify-start items-center p-4 hover:bg-yellowPrimary/50 w-full'
                        onClick={() => handleChangeLanguage(languages.english)}
                      >
                        <FontAwesomeIcon icon={faEarthEurope} className='text-lg mr-2' />
                        English
                      </button>
                    </div>
                  </PopoverMobile>
                </div>
                <hr />
                <div className='text-white mb-2'>
                  <Link to={paths.home} className='block w-full px-6 py-3 hoverHeaderBtn'>
                    Trang chủ
                  </Link>
                  <Link to={paths.about} className='block w-full px-6 py-3 hoverHeaderBtn'>
                    Về chúng tôi
                  </Link>
                  <Link to={paths.contact} className='block w-full px-6 py-3 hoverHeaderBtn'>
                    Liên hệ
                  </Link>
                  <Link to={paths.faq} className='block w-full px-6 py-3 hoverHeaderBtn'>
                    FAQ
                  </Link>
                </div>
                <hr />
                <form className='flex justify-between items-center bg-white rounded-sm overflow-hidden px-2 mt-2'>
                  <input
                    type='text'
                    placeholder='Tìm kiếm...'
                    className='w-full text-lg p-3 outline-none focus:placeholder-yellowPrimary'
                  />
                  <button className='p-3 hoverChangeTextColor'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='text-xl' />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
