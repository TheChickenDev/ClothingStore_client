import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { jwtDecode } from 'jwt-decode'
import { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateAccount } from 'src/apis/user.api'
import { userImg } from 'src/assets/images'
import NavigationTree from 'src/components/NavigationTree'
import paths from 'src/constants/paths'
import { AppContext } from 'src/contexts/app.context'
import { JWTPayload } from 'src/types/utils.type'
import {
  getAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
  saveRefreshTokenToLocalStorage
} from 'src/utils/auth'
import { UpdateFormData, updateSchema } from 'src/utils/rules'

export default function Profile() {
  const avatarRef = useRef<HTMLImageElement>(null)
  const { id, name, email, phone, address, avatar } = jwtDecode<JWTPayload>(getAccessTokenFromLocalStorage())

  const [inputName, setInputName] = useState<string>(name)
  const [inputEmail, setInputEmail] = useState<string>(email)
  const [inputPhone, setInputPhone] = useState<string>(phone)
  const [inputAddress, setInputAddress] = useState<string>(address)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(updateSchema)
  })

  const navigate = useNavigate()
  const { setUserAvatar, darkTheme } = useContext(AppContext)
  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: FormData }) => updateAccount(id, body)
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

  const onSubmit = (data: UpdateFormData) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('phone', data.phone)
    formData.append('address', data.address)
    const files = (document.getElementById('avatar') as HTMLInputElement).files
    if (files) {
      formData.append('avatar', files[0])
    }
    updateMutation.mutate(
      { id, body: formData },
      {
        onSuccess: (response) => {
          const status = response.data.status
          if (status === 'OK') {
            const { access_token, refresh_token } = response.data.data
            saveAccessTokenToLocalStorage(access_token)
            saveRefreshTokenToLocalStorage(refresh_token)
            toast.success(response.data.message)
            setUserAvatar(response.data.data?.user.avatar)
            navigate(paths.profile)
          } else toast.error(response.data.message)
        },
        onError: (error) => {
          toast.error(error.message)
        }
      }
    )
  }

  useEffect(() => {
    setInputName(name)
    setInputEmail(email)
    setInputPhone(phone)
    setInputAddress(address)
  }, [id, name, email, phone, address, avatar])

  const handleTextAreaEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode == 13) {
      event.preventDefault()
    }
  }

  return (
    <div className={classNames('pt-28 pb-12 lg:px-32 px-4 md:px-16', { 'bg-black-theme': darkTheme })}>
      <NavigationTree
        tree={[
          { name: 'Trang chủ', path: paths.home },
          { name: 'Hồ sơ của tôi', path: paths.profile }
        ]}
        currentPath={paths.profile}
      />
      <form onSubmit={handleSubmit(onSubmit)} className='md:flex flex-wrap items-center flex-auto'>
        <div className='md:w-1/2 w-full px-2'>
          <input
            className='w-full px-6 py-3 mt-2 mb-8 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-green-primary'
            type='text'
            value={inputEmail}
            disabled
            placeholder='Email'
          />
          <input
            className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-green-primary'
            type='text'
            value={inputName}
            placeholder='Họ và tên'
            {...register('name')}
            onChange={(e) => setInputName(e.target.value)}
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
            value={inputPhone}
            placeholder='Số điện thoại'
            {...register('phone')}
            onChange={(e) => setInputPhone(e.target.value)}
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
            value={inputAddress}
            {...register('address')}
            onKeyDown={(event) => handleTextAreaEnter(event)}
            onChange={(e) => setInputAddress(e.target.value)}
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
            src={avatar ? avatar : userImg.defaultAvatar}
            alt='avatar'
            ref={avatarRef}
            className='w-3/4 aspect-square rounded-full mb-2 mx-auto'
          />
          <div className={classNames({ 'text-white': darkTheme })}>
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
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <div className='w-full flex justify-center items-center'>
                <div className='loader'></div>
              </div>
            ) : (
              'Cập nhật thông tin'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
