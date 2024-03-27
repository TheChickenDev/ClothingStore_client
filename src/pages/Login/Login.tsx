import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import paths from 'src/constants/paths'
import { loginSchema, LoginFormData } from 'src/utils/rules'
import { login } from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'

export default function Login() {
  const imgRef = useRef<HTMLImageElement>(null)
  const imgBoundRef = useRef<HTMLDivElement>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const { setIsAuthenticated } = useContext(AppContext)
  const loginMutation = useMutation({
    mutationFn: (body: LoginFormData) => login(body)
  })

  const navigate = useNavigate()

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        const status = response.data.status
        if (status === 'OK') {
          setIsAuthenticated(true)
          navigate(paths.home)
          toast.success(response.data.message)
        } else toast.error(response.data.message)
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-greenPrimary'
              type='text'
              placeholder='Email'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-red-700 text-start ml-4' role='alert'>
                {errors.email.message}
              </p>
            )}
            <input
              className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-greenPrimary'
              type='password'
              placeholder='Mật khẩu'
              {...register('password')}
            />
            {errors.password && (
              <p className='text-red-700 text-start ml-4' role='alert'>
                {errors.password.message}
              </p>
            )}
            <button className='w-full px-6 py-3 my-6 bg-greenPrimary rounded-3xl text-xl text-white flex justify-center items-center hover:bg-greenPrimary/90'>
              Đăng nhập
            </button>
          </form>
          <p>
            <Link to={paths.home} className='text-sm text-gray-700 hover:text-greenPrimary'>
              Quên mật khẩu?
            </Link>
          </p>
          <p className='my-6'>
            <Link to={paths.register} className='text-sm text-gray-700 hover:text-greenPrimary'>
              Tạo tài khoản mới <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
