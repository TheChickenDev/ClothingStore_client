import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from 'src/contexts/app.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import paths from 'src/constants/paths'

export default function Footer() {
  const { isAuthenticated, userEmail } = useContext(AppContext)
  return (
    <div className='bg-gradient-to-t from-blackPrimary to-white w-full px-4 py-10'>
      <div className='flex justify-center items-center text-white text-3xl gap-4'>
        <a
          href='https://www.facebook.com/nam.nguyens.359'
          className='p-4 hover:opacity-80'
          target='_blank'
          rel='noreferrer'
        >
          <FontAwesomeIcon icon={faGlobe} />
        </a>
        <a
          href='https://www.facebook.com/nam.nguyens.359'
          className='p-4 hover:opacity-80'
          target='_blank'
          rel='noreferrer'
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
      <div className='m-auto pb-4 text-white text-center'>
        {(isAuthenticated && (
          <>
            <span>Hello! </span>
            <Link to={paths.profile} className='text-center text-sm text-yellowPrimary'>
              {userEmail}
            </Link>
          </>
        )) || (
          <div className='text-center'>
            <p className='inline-block'>Bạn chưa đăng nhập.</p>
            &nbsp;
            <Link to={paths.login} className='inline-block'>
              (Nhấn vào đây để đăng nhập)
            </Link>
          </div>
        )}
      </div>
      <p className='text-center text-white text-sm'>Copyright NEMNEM © 2024</p>
    </div>
  )
}
