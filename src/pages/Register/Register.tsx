import { faSignIn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerAccount } from 'src/apis/auth.api'
import { userImg } from 'src/assets/images'
import paths from 'src/constants/paths'
import { AppContext } from 'src/contexts/app.context'
import { saveCartToLocalStorage } from 'src/utils/auth'
import { RegisterFormData, registerSchema } from 'src/utils/rules'

export default function Register() {
  const avatarRef = useRef<HTMLImageElement>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerSchema)
  })

  const navigate = useNavigate()
  const { setIsAuthenticated, setUserEmail, setUserAvatar, setCart } = useContext(AppContext)
  const registerMutation = useMutation({
    mutationFn: (body: FormData) => registerAccount(body)
  })

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validFileTypes = ['image/png', 'image/jpg', 'image/jpeg']
    if (event.target.files && event.target.files.length > 0 && avatarRef.current) {
      const selectedFile = event.target.files[0]
      const imgtag = avatarRef.current
      const reader = new FileReader()
      if (!validFileTypes.includes(selectedFile.type)) {
        imgtag.src = userImg.defaultAvatar
        return
      }
      imgtag.title = selectedFile.name
      reader.onload = (event) => {
        if (event.target) {
          imgtag.src = event.target.result as string
        }
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const onSubmit = (data: RegisterFormData) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('confirm_password', data.confirm_password)
    formData.append('phone', data.phone)
    formData.append('address', data.address)
    const files = (document.getElementById('avatar') as HTMLInputElement).files
    if (files) {
      formData.append('avatar', files[0])
    }
    registerMutation.mutate(formData, {
      onSuccess: (response) => {
        const status = response.data.status
        const user = response.data.data?.user
        if (status === 'OK' && user) {
          setIsAuthenticated(true)
          setUserEmail(user.email)
          setUserAvatar(user.avatar ? user.avatar : userImg.defaultAvatar)
          setCart(user.cart)
          saveCartToLocalStorage(user.cart)
          navigate(paths.home)
          toast.success(response.data.message)
        } else toast.error(response.data.message)
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  const handleTextAreaEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode == 13) {
      event.preventDefault()
    }
  }

  return (
    <div className='w-full h-full bg-gradient-to-r from-pink-primary/70 to-white flex justify-center items-center'>
      <div className='w-[960px] max-w-[90%] min-h-96 py-24 sm:px-16 rounded-xl bg-white my-12'>
        <p className='text-2xl font-bold mb-2 col-span-2 text-center'>Đăng ký</p>
        <form onSubmit={handleSubmit(onSubmit)} className='md:flex flex-wrap items-center flex-auto'>
          <div className='md:w-1/2 w-full px-2'>
            <input
              className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-green-primary'
              type='text'
              placeholder='Họ và tên'
              {...register('name')}
            />
            <div className='min-h-5'>
              {errors.name && (
                <p className='text-red-700 text-start ml-4' role='alert'>
                  {errors.name.message}
                </p>
              )}
            </div>
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
            <input
              className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-green-primary'
              type='password'
              placeholder='Mật khẩu'
              {...register('password')}
            />
            <div className='min-h-5'>
              {errors.password && (
                <p className='text-red-700 text-start ml-4' role='alert'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <input
              className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-green-primary'
              type='password'
              placeholder='Nhập lại mật khẩu'
              {...register('confirm_password')}
            />
            <div className='min-h-5'>
              {errors.confirm_password && (
                <p className='text-red-700 text-start ml-4' role='alert'>
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
            <input
              className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-green-primary'
              type='text'
              placeholder='Số điện thoại'
              {...register('phone')}
            />
            <div className='min-h-5'>
              {errors.phone && (
                <p className='text-red-700 text-start ml-4' role='alert'>
                  {errors.phone.message}
                </p>
              )}
            </div>
            <textarea
              className='w-full resize-none px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-green-primary'
              placeholder='Địa chỉ'
              {...register('address')}
              onKeyDown={(event) => handleTextAreaEnter(event)}
            />
            <div className='min-h-5'>
              {errors.address && (
                <p className='text-red-700 text-start ml-4' role='alert'>
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>
          <div className='md:w-1/2 w-full px-2 text-center'>
            <img
              src={userImg.defaultAvatar}
              alt='avatar'
              ref={avatarRef}
              className='w-3/4 aspect-square rounded-full mb-2 mx-auto'
            />
            <div>
              <input
                className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg hidden'
                id='avatar'
                type='file'
                multiple={false}
                {...register('avatar')}
                onChange={(e) => onFileSelected(e)}
              />
              <label htmlFor='avatar' className='hover:text-pink-primary cursor-pointer p-2'>
                Nhấn vào đây để chọn ảnh đại diện
                <br></br>
                (không bắt buộc)
              </label>
              <div className='min-h-5'>
                {errors.avatar && (
                  <p className='text-red-700 text-start ml-4' role='alert'>
                    {errors.avatar.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='w-full px-2 mt-2 text-center'>
            <button
              className='w-fit min-w-64 px-6 py-3 bg-green-primary rounded-3xl text-xl text-white hover:bg-green-primary/90 col-span-2'
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <div className='w-full flex justify-center items-center'>
                  <div className='loader'></div>
                </div>
              ) : (
                'Đăng ký'
              )}
            </button>
            <p className='text-center col-span-2 mt-2'>
              <span className='text-sm'>Đã có tài khoản? </span>
              <Link to={paths.login} className='text-sm text-pink-primary hover:text-green-primary'>
                Đăng nhập <FontAwesomeIcon icon={faSignIn} />
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
