import { faFacebookF, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { sendMessage } from 'src/apis/user.api'
import { contactPageImg } from 'src/assets/images'
import paths from 'src/constants/paths'
import { SendMessageFormData, sendMessageSchema } from 'src/utils/rules'

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(sendMessageSchema)
  })

  const sendMessageMutation = useMutation({
    mutationFn: ({ body }: { body: SendMessageFormData }) => sendMessage(body)
  })

  const navigate = useNavigate()

  const onSubmit = (data: SendMessageFormData) => {
    sendMessageMutation.mutate(
      { body: data },
      {
        onSuccess: (response) => {
          const status = response.data.status
          if (status === 'OK') {
            toast.success(response.data.message)
            navigate(paths.contact)
          } else toast.error(response.data.message)
        },
        onError: (error) => {
          toast.error(error.message)
        }
      }
    )
  }

  const handleTextAreaEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode == 13) {
      event.preventDefault()
    }
  }

  return (
    <div className='py-24'>
      <section className='relative text-center bg-contact-carousel bg-no-repeat bg-cover bg-center'>
        <div className='relative pt-56 pb-48 text-black font-bold z-10'>
          <p className='text-6xl mb-4'>Có câu hỏi?</p>
          <p className='text-6xl mb-4'>Liên hệ với chúng tôi.</p>
        </div>
      </section>
      <section className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:px-24 px-4'>
        <div className='z-10 bg-white p-12 text-center font-heading shadow-md'>
          <img src={contactPageImg.icon2} alt='contact' className='block m-auto' />
          <p className='underline text-xl text-gray-400 my-4'>Liên hệ</p>
          <div className='text-xl font-bold'>
            <a href='mailto:ngthnam513@gmail.com'>ngthnam513@gmail.com</a>
            <br />
            <a href='tel:0363917513'>+(84)&nbsp;363&nbsp;917&nbsp;513</a>
          </div>
        </div>
        <div className='z-10 bg-white p-12 text-center font-heading shadow-md'>
          <img src={contactPageImg.icon1} alt='contact' className='block m-auto' />
          <p className='underline text-xl text-gray-400 my-4'>Địa chỉ</p>
          <div className='text-xl font-bold'>
            <a href='https://maps.app.goo.gl/MpHwAhcprKJm4EfA9' target='_blank' rel='noreferrer'>
              Số 1, Võ Văn Ngân, Thủ Đức, TP.HCM
            </a>
          </div>
        </div>
        <div className='z-10 bg-white p-12 text-center font-heading shadow-md'>
          <img src={contactPageImg.icon3} alt='contact' className='block m-auto' />
          <p className='underline text-xl text-gray-400 my-4'>Truyền thông</p>
          <div className='text-xl font-bold'>
            <p>Theo dõi chúng tôi:</p>
            <div className='text-lg text-gray-500'>
              <a
                href='https://www.facebook.com/nam.nguyens.359'
                target='_blank'
                rel='noreferrer'
                className='hover:text-pink-primary duration-300 p-2'
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href='https://www.facebook.com/nam.nguyens.359'
                target='_blank'
                rel='noreferrer'
                className='hover:text-pink-primary duration-300 p-2'
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href='https://www.facebook.com/nam.nguyens.359'
                target='_blank'
                rel='noreferrer'
                className='hover:text-pink-primary duration-300 p-2'
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a
                href='https://www.facebook.com/nam.nguyens.359'
                target='_blank'
                rel='noreferrer'
                className='hover:text-pink-primary duration-300 p-2'
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className='lg:px-24 px-4 sm:mt-24 mt-12'>
        <div className='lg:p-24 sm:p-12 p-4 border'>
          <p className='text-2xl font-bold font-heading mb-4'>Gửi tin nhắn</p>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-2 grid-cols-2'>
            <div className='md:col-span-1 col-span-2'>
              <input
                className='w-full p-2 bg-gray-primary text-lg outline-none border border-gray-primary focus:border-pink-primary'
                type='text'
                placeholder='Email'
                {...register('email')}
              />
              <div className='min-h-5 mt-2'>
                {errors.email && (
                  <p className='text-red-700 text-start' role='alert'>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className='md:col-span-1 col-span-2'>
              <input
                className='w-full p-2 bg-gray-primary text-lg outline-none border focus:border-pink-primary'
                type='text'
                placeholder='Họ và tên'
                {...register('name')}
              />
              <div className='min-h-5 mt-2'>
                {errors.name && (
                  <p className='text-red-700 text-start' role='alert'>
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div className='col-span-2'>
              <textarea
                className='w-full resize-none p-2 bg-gray-primary text-lg outline-none border focus:border-pink-primary'
                rows={5}
                placeholder='Tin nhắn...'
                {...register('message')}
                onKeyDown={(event) => handleTextAreaEnter(event)}
              />
              <div className='min-h-5 mt-2'>
                {errors.message && (
                  <p className='text-red-700 text-start' role='alert'>
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>
            <button
              className='w-fit min-w-48 p-2 bg-pink-primary text-xl text-white hover:bg-purple-primary justify-self-end col-start-2'
              disabled={sendMessageMutation.isPending}
            >
              {sendMessageMutation.isPending ? (
                <div className='w-full flex justify-center items-center'>
                  <div className='loader'></div>
                </div>
              ) : (
                'Gửi tin nhắn'
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
