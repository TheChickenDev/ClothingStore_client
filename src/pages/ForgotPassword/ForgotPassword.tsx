import { faArrowRight, faSignIn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { forgotPassword } from 'src/apis/auth.api'
import { loginImg } from 'src/assets/images'
import paths from 'src/constants/paths'
import { ForgotPasswordFormData, forgotPasswordSchema } from 'src/utils/rules'

export default function ForgotPassword() {
  const imgRef = useRef<HTMLImageElement>(null)
  const imgBoundRef = useRef<HTMLDivElement>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema)
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: (body: ForgotPasswordFormData) => forgotPassword(body)
  })

  const navigate = useNavigate()

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: (response) => {
        const status = response.data.status
        if (status === 'OK') {
          navigate(`/reset-password/${response.data.data}`)
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
    <div className='w-full h-full bg-gradient-to-r from-pink-primary/70 to-white flex justify-center items-center'>
      <div className='w-[960px] max-w-[90%] min-h-96 py-40 sm:px-16 rounded-xl sm:flex sm:justify-evenly sm:items-center bg-white my-12'>
        <div className='sm:w-2/5 p-8' ref={imgBoundRef}>
          <img
            src={loginImg.loginAnimatedImg}
            alt='login'
            className='w-full h-full block will-change-transform'
            ref={imgRef}
          />
        </div>
        <div className='sm:w-1/2 px-8 text-center'>
          <p className='text-2xl font-bold mb-2'>Quên mật khẩu</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-green-primary'
              type='text'
              placeholder='Email'
              {...register('email')}
            />
            <div className='min-h-5'>
              {errors.email && (
                <p className='text-red-700 text-start ml-4' role='alert'>
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              className='w-full min-h-14 px-6 py-3 mt-2 bg-green-primary rounded-3xl text-xl text-white text-center'
              disabled={forgotPasswordMutation.isPending}
            >
              {forgotPasswordMutation.isPending ? (
                <div className='w-full flex justify-center items-center'>
                  <div className='loader'></div>
                </div>
              ) : (
                'Lấy mã OTP'
              )}
            </button>
          </form>
          <p className='text-center col-span-2 mt-2'>
            <span className='text-sm'>Đã có tài khoản? </span>
            <Link to={paths.login} className='text-sm text-pink-primary hover:text-green-primary'>
              Đăng nhập <FontAwesomeIcon icon={faSignIn} />
            </Link>
          </p>
          <p className='my-2'>
            <Link to={paths.register} className='text-sm text-gray-700 hover:text-green-primary'>
              Tạo tài khoản mới <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
