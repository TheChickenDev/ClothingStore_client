import { faSignIn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import paths from 'src/constants/paths'

export default function Register() {
  const imgRef = useRef<HTMLImageElement>(null)
  const imgBoundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let startX: number
    let startY: number
    imgBoundRef.current?.addEventListener('mouseenter', (event) => {
      event.preventDefault()
      startX = event.clientX
      startY = event.clientY
      imgRef?.current && (imgRef.current.style.transform = `scale3d(1.2, 1.2, 1.2)`)
      setTimeout(() => {
        imgRef?.current?.classList.remove('transition-transform')
      }, 0)
    })
    imgBoundRef.current?.addEventListener('mousemove', (event) => {
      event.preventDefault()
      const rotateX = (startY - event.clientY) / 10 + 'deg'
      const rotateY = (startX - event.clientX) / 10 + 'deg'
      imgRef?.current &&
        (imgRef.current.style.transform = `perspective(300px) rotateX(${rotateX}) rotateY(${rotateY}) scale3d(1.2, 1.2, 1.2)`)
    })
    imgBoundRef.current?.addEventListener('mouseleave', (event) => {
      event.preventDefault()
      imgRef?.current?.classList.add('transition-transform')
      imgRef?.current && (imgRef.current.style.transform = '')
    })
  }, [])

  return (
    <div className='w-full h-full bg-gradient-to-r from-fuchsia-500 to-orange flex justify-center items-center'>
      <div className='w-[960px] max-w-[90%] min-h-96 pt-36 pb-24 sm:px-16 rounded-xl sm:flex sm:justify-evenly sm:items-center bg-white my-12'>
        <div className='sm:w-2/5 p-8' ref={imgBoundRef}>
          <img
            src='https://colorlib.com/etc/lf/Login_v1/images/img-01.png'
            alt='login'
            className='w-full h-full block will-change-transform'
            ref={imgRef}
          />
        </div>
        <div className='sm:w-1/2 px-8 text-center'>
          <p className='text-2xl font-bold mb-8'>Đăng nhập</p>
          <form>
            <input
              className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-greenPrimary'
              type='text'
              placeholder='Email'
              autoComplete='username'
            />
            <input
              className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-greenPrimary'
              type='password'
              placeholder='Mật khẩu'
              autoComplete='current-password'
            />
            <input
              className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-greenPrimary'
              type='password'
              placeholder='Nhập lại mật khẩu'
              autoComplete='current-password'
            />
            <button className='w-full px-6 py-3 my-6 bg-greenPrimary rounded-3xl text-xl text-white flex justify-center items-center hover:bg-greenPrimary/90'>
              Đăng ký
            </button>
          </form>
          <p className='my-6'>
            <span className='text-sm'>Đã có tài khoản? </span>
            <Link to={paths.login} className='text-sm text-red-700 hover:text-greenPrimary'>
              Đăng nhập <FontAwesomeIcon icon={faSignIn} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
