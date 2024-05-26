import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Awards() {
  const handleNavigateClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className='sm:px-24 px-4 font-heading-2'>
      <p className='sm:text-5xl text-3xl font-bold text-center pb-12 border-b'>Thành tựu</p>
      <div className='md:flex items-center py-8 border-b relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:duration-500 after:bg-gradient-to-r after:from-pink-primary after:to-yellow-primary hover:after:w-full'>
        <p className='md:w-1/4 text-lg text-gray-700'>FREE SHIPPING</p>
        <div className='flex-1'>
          <p className='relative w-fit sm:text-3xl text-xl font-bold my-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:duration-500 after:bg-black hover:after:w-full'>
            Modern painting award jump
          </p>
          <p>Runner Up - “ Decor of the week “</p>
        </div>
        <button className='text-2xl hover:text-pink-primary duration-300 py-2 my-2' onClick={handleNavigateClick}>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </button>
      </div>
      <div className='md:flex items-center py-8 border-b relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:duration-500 after:bg-gradient-to-r after:from-pink-primary after:to-yellow-primary hover:after:w-full'>
        <p className='md:w-1/4 text-lg text-gray-700'>FREE RETURN</p>
        <div className='flex-1'>
          <p className='relative w-fit sm:text-3xl text-xl font-bold my-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:duration-500 after:bg-black hover:after:w-full'>
            People&apos;s choice: best design
          </p>
          <p>Runner Up - “ Decor of the week “</p>
        </div>
        <button className='text-2xl hover:text-pink-primary duration-300 py-2 my-2' onClick={handleNavigateClick}>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </button>
      </div>
      <div className='md:flex items-center py-8 border-b relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:duration-500 after:bg-gradient-to-r after:from-pink-primary after:to-yellow-primary hover:after:w-full'>
        <p className='md:w-1/4 text-lg text-gray-700'>SECURE PAYMENT</p>
        <div className='flex-1'>
          <p className='relative w-fit sm:text-3xl text-xl font-bold my-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:duration-500 after:bg-black hover:after:w-full'>
            Webby&apos;s, Site of the Year
          </p>
          <p>Runner Up - “ Decor of the week “</p>
        </div>
        <button className='text-2xl hover:text-pink-primary duration-300 py-2 my-2' onClick={handleNavigateClick}>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </button>
      </div>
      <div className='md:flex items-center py-8 border-b relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:duration-500 after:bg-gradient-to-r after:from-pink-primary after:to-yellow-primary hover:after:w-full'>
        <p className='md:w-1/4 text-lg text-gray-700'>BEST QUALITY</p>
        <div className='flex-1'>
          <p className='relative w-fit sm:text-3xl text-xl font-bold my-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:duration-500 after:bg-black hover:after:w-full'>
            Awwwards site of the day
          </p>
          <p>Runner Up - “ Decor of the week “</p>
        </div>
        <button className='text-2xl hover:text-pink-primary duration-300 py-2 my-2' onClick={handleNavigateClick}>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </button>
      </div>
    </section>
  )
}
