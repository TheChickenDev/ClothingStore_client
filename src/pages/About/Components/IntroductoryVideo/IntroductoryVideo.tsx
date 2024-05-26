import { faMinus, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useState } from 'react'
import { aboutPageImg } from 'src/assets/images'
import VideoModal from 'src/components/VideoModal'

function ExpandComponent({ question, answer }: { question: string; answer: string }) {
  const [isExpand, setExpand] = useState(false)

  return (
    <div className='py-4 border-b'>
      <button
        className={classNames('w-full flex py-4 hover:text-pink-primary', {
          'text-pink-primary': isExpand
        })}
        onClick={() => setExpand((prev) => !prev)}
      >
        <span className='flex-1 text-start font-semibold'>{question}</span>
        <span className='relative'>
          <div className='absolute top-0 right-0'>
            <FontAwesomeIcon icon={faMinus} />
          </div>
          <div
            className={classNames('absolute top-0 right-0 duration-300', {
              '-rotate-90 translate-x-[1px] translate-y-[-1px]': !isExpand
            })}
          >
            <FontAwesomeIcon icon={faMinus} />
          </div>
        </span>
      </button>
      <div
        className={classNames('overflow-hidden transition-all duration-500 max-h-0', {
          'max-h-96': isExpand
        })}
      >
        <p className='text-gray-600 mb-4'>{answer}</p>
      </div>
    </div>
  )
}

export default function IntroductoryVideo() {
  const [isOpen, setOpen] = useState(false)

  function toggleOpen() {
    setOpen(!isOpen)
  }

  return (
    <section className='sm:py-24 py-12 lg:flex items-center'>
      <div className='lg:w-1/2 my-4 relative'>
        <div>
          <img src={aboutPageImg.videoThumbnail} alt='video' className='block w-full h-full' />
        </div>
        <button
          className='w-24 h-24 bg-white rounded-full text-pink-primary text-xl absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            before:absolute before:-inset-4 before:rounded-full before:border before:-z-10 before:backdrop-blur-sm before:animate-ping-slow
            after:absolute after:-inset-4 after:rounded-full after:border after:-z-10 after:backdrop-blur-sm after:animate-ping-slow-delay'
          onClick={toggleOpen}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </div>
      <div className='lg:w-[calc(50%+48px)] lg:-ml-12 lg:mr-0 mx-4 p-1 bg-gradient-to-r from-black to-white'>
        <div className='bg-white lg:p-20 p-4 font-heading-2'>
          <p className='text-lg font-semibold mb-4'>Liên hệ với chúng tôi để</p>
          <p className='text-3xl font-bold pb-8 border-b'>Nhận dịch vụ số thông minh và linh hoạt</p>
          <ExpandComponent
            question='Tôi có thể hủy tài khoản của mình bất cứ lúc nào không?'
            answer='Non similique culpa in provident quos sit commodi beatae ea laborum suscipit id autem velit aut iusto odio et deleniti quis et doloremque enim vel consequuntur quos.'
          />
          <ExpandComponent
            question='Điều gì xảy ra khi giấy phép hết hạn?'
            answer='Non similique culpa in provident quos sit commodi beatae ea laborum suscipit id autem velit aut iusto odio et deleniti quis et doloremque enim vel consequuntur quos.'
          />
          <ExpandComponent
            question='Hein Shop có tài liệu hướng dẫn không?'
            answer='Non similique culpa in provident quos sit commodi beatae ea laborum suscipit id autem velit aut iusto odio et deleniti quis et doloremque enim vel consequuntur quos.'
          />
        </div>
      </div>
      <VideoModal
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        youtubeVideoUrl='https://www.youtube.com/watch?v=gbLmku5QACM'
      />
    </section>
  )
}
