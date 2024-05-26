import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContext } from 'src/contexts/app.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import paths from 'src/constants/paths'
import classNames from 'classnames'

export default function Footer() {
  const { isAuthenticated, userEmail, darkTheme } = useContext(AppContext)
  return (
    <div className={classNames('w-full px-4 py-10 border-t', { 'bg-black-theme text-white': darkTheme })}>
      <div className='flex justify-center items-center text-gray-300 text-3xl gap-4'>
        <a
          href='https://www.facebook.com/nam.nguyens.359'
          className='p-2 m-2 hover:text-purple-primary'
          target='_blank'
          rel='noreferrer'
        >
          <FontAwesomeIcon icon={faGlobe} />
        </a>
        <a
          href='https://www.facebook.com/nam.nguyens.359'
          className='p-2 m-2 hover:text-purple-primary'
          target='_blank'
          rel='noreferrer'
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
      <div className='m-auto pb-4 text-center'>
        {(isAuthenticated && (
          <>
            <span>Hello! </span>
            <Link to={paths.profile} className='text-center text-sm text-pink-primary hover:text-purple-primary'>
              {userEmail}
            </Link>
          </>
        )) || (
          <div className='text-center'>
            <p className='inline-block'>Bạn chưa đăng nhập.</p>
            &nbsp;
            <Link to={paths.login} className='inline-block text-pink-primary hover:text-purple-primary'>
              (Nhấn vào đây để đăng nhập)
            </Link>
          </div>
        )}
      </div>
      <p className='text-center text-sm'>
        Copyright © 2024 by <span className='text-pink-primary hover:text-purple-primary'>NEM</span>. All rights
        reserved.
      </p>
    </div>
  )
}
