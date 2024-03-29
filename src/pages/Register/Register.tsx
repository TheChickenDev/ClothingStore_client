import { faSignIn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerAccount } from 'src/apis/auth.api'
import { loginImg } from 'src/assets/images'
import paths from 'src/constants/paths'
import { AppContext } from 'src/contexts/app.context'
import { RegisterFormData, registerSchema } from 'src/utils/rules'

export default function Register() {
  const imgRef = useRef<HTMLImageElement>(null)
  const imgBoundRef = useRef<HTMLDivElement>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerSchema)
  })

  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AppContext)
  const registerMutation = useMutation({
    mutationFn: (body: RegisterFormData) => registerAccount(body)
  })

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data, {
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

  const handleTextAreaEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode == 13) {
      event.preventDefault()
    }
  }

  return (
    <div className='w-full h-full bg-gradient-to-r from-fuchsia-500 to-orange flex justify-center items-center'>
      <div className='w-[960px] max-w-[90%] min-h-96 pt-36 pb-24 md:px-16 rounded-xl md:flex md:justify-evenly md:items-center bg-white my-12'>
        <div className='md:w-2/5 p-8' ref={imgBoundRef}>
          <img
            src={loginImg.loginAnimatedImg}
            alt='login'
            className='w-full h-full block will-change-transform'
            ref={imgRef}
          />
        </div>
        <div className='md:w-1/2 px-8 text-center'>
          <p className='text-2xl font-bold mb-8'>Đăng ký</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-greenPrimary'
              type='text'
              placeholder='Họ và tên'
              {...register('name')}
            />
            {errors.name && (
              <p className='text-red-700 text-start ml-4' role='alert'>
                {errors.name.message}
              </p>
            )}
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
            <input
              className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-greenPrimary'
              type='password'
              placeholder='Nhập lại mật khẩu'
              {...register('confirm_password')}
            />
            {errors.confirm_password && (
              <p className='text-red-700 text-start ml-4' role='alert'>
                {errors.confirm_password.message}
              </p>
            )}
            <input
              className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-greenPrimary'
              type='text'
              placeholder='Số điện thoại'
              {...register('phone')}
            />
            {errors.phone && (
              <p className='text-red-700 text-start ml-4' role='alert'>
                {errors.phone.message}
              </p>
            )}
            <textarea
              className='w-full resize-none px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-greenPrimary'
              placeholder='Địa chỉ'
              {...register('address')}
              onKeyDown={(event) => handleTextAreaEnter(event)}
            />
            {errors.address && (
              <p className='text-red-700 text-start ml-4' role='alert'>
                {errors.address.message}
              </p>
            )}
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
