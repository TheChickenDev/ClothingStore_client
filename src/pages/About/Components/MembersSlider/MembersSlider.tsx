import { faFacebookF, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightLong, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext, useState } from 'react'
import Slider from 'react-slick'
import { aboutPageImg } from 'src/assets/images'
import { AppContext } from 'src/contexts/app.context'

function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='absolute bottom-0 right-0'>
      <a
        href='mailto:ngthnam513@gmail.com'
        className='flex justify-center items-center mr-4 mb-1 bg-purple-primary text-white text-xl w-10 h-10 duration-300 hover:bg-pink-primary'
      >
        <FontAwesomeIcon icon={faEnvelope} />
      </a>
      <div className='relative'>
        <button
          className='mr-4 mb-4 bg-purple-primary text-white text-xl w-10 h-10 duration-300 hover:bg-pink-primary'
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onTouchStart={() => setIsOpen(true)}
          onTouchEnd={() => setIsOpen(false)}
        >
          <FontAwesomeIcon icon={faShareNodes} />
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: [10, 0] }}
                exit={{ opacity: 0, x: 10 }}
                className='absolute top-0 right-full flex pr-1'
              >
                <a
                  className='flex justify-center items-center bg-gray-primary text-black text-xl w-10 h-10 duration-300 hover:bg-pink-primary hover:text-white'
                  href='https://www.facebook.com/nam.nguyens.359'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a
                  className='mx-1 flex justify-center items-center bg-gray-primary text-black text-xl w-10 h-10 duration-300 hover:bg-pink-primary hover:text-white'
                  href='https://www.facebook.com/nam.nguyens.359'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  className='flex justify-center items-center bg-gray-primary text-black text-xl w-10 h-10 duration-300 hover:bg-pink-primary hover:text-white'
                  href='https://www.facebook.com/nam.nguyens.359'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  )
}

export default function MembersSlider() {
  const [activeSlide, setActiveSlide] = useState(0)
  const { darkTheme } = useContext(AppContext)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: activeSlide,
    arrows: false,
    customPaging: (i: number) => (
      <div
        className={classNames(
          'relative mt-8 w-2 h-2 bg-gray-primary rounded-full after:absolute after:inset-0 after:-z-10 after:bg-pink-primary/10 after:rounded-full after:duration-300',
          {
            'bg-pink-primary after:scale-[3]': i === activeSlide
          }
        )}
      ></div>
    ),
    afterChange: (current: number) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  return (
    <section className='md:px-24 px-4'>
      <div className='flex justify-between items-center mb-8'>
        <p className={classNames('lg:text-7xl text-5xl font-heading font-bold', { 'text-white': darkTheme })}>
          One&nbsp;
          <span className='relative text-pink-primary'>
            Team
            <div className='absolute left-0 right-0 -bottom-[10%]'>
              <svg viewBox='0 0 220 27' fill='none'>
                <path
                  d='M19.6407 15.2948C33.4481 12.464 47.2752 10.3031 61.24 8.63481C48.6133 9.07487 35.9865 9.33103 23.3729 9.29162C22.4743 9.29162 21.7396 8.54942 21.7396 7.64958C21.7462 6.74318 22.4808 6.00754 23.386 6.00754C60.8398 6.12577 138.464 3.57728 175.839 1.69222C185.81 1.18648 195.563 0.739778 205.534 0.477052C208.079 0.41137 210.63 0.280046 213.175 0.188091C214.5 0.142114 217.924 -0.0286769 218.403 0.0041639C219.761 0.0895499 219.964 1.27179 219.984 1.4557C220.036 1.8892 220.003 2.53954 219.242 3.03215C219.19 3.07156 218.895 3.25544 218.232 3.33426C181.198 7.74806 103.764 7.1897 66.6842 11.3079C51.0861 13.0485 35.6783 15.3606 20.3032 18.5133C14.9311 19.6102 11.8678 20.3064 7.57803 21.4493C14.649 23.3081 21.8971 24.3393 29.2173 24.891C29.2173 24.891 19.6407 27.474 12.386 25.9286C5.13134 24.3833 4.9674 24.221 1.33353 23.0321C0.493934 22.7628 0.238148 22.2375 0.133199 21.955C-0.0963783 21.3639 -0.0701445 20.7136 0.539874 20.1159C0.703857 19.9583 1.01869 19.7349 1.51064 19.5773C2.15346 19.3737 3.48499 19.1636 4.08189 18.9994C9.9853 17.3705 13.1535 16.6216 19.6407 15.2948Z'
                  fill='currentColor'
                ></path>
              </svg>
            </div>
          </span>
          , <br /> Many Talents
        </p>
        <button className='group border-b border-black hover:text-pink-primary hover:border-pink-primary duration-300'>
          Tham gia <FontAwesomeIcon icon={faArrowRightLong} className='group-hover:translate-x-2 duration-300' />
        </button>
      </div>
      <Slider {...settings} className='-mx-4'>
        <div className='px-4'>
          <div className='relative overflow-hidden'>
            <img src={aboutPageImg.member1} alt='member1' className='block w-full' />
            <ContactPopup />
          </div>
          <div className='font-heading-2'>
            <p className={classNames('font-bold text-xl mt-2', { 'text-white': darkTheme })}>Leslie Alexander</p>
            <p className='text-xs text-gray-500'>FOUNDER-CO</p>
          </div>
        </div>
        <div className='px-4'>
          <div className='relative overflow-hidden'>
            <img src={aboutPageImg.member2} alt='member2' className='block w-full' />
            <ContactPopup />
          </div>
          <div className='font-heading-2'>
            <p className={classNames('font-bold text-xl mt-2', { 'text-white': darkTheme })}>Annette Black</p>
            <p className='text-xs text-gray-500'>PRODUCT DESIGNER</p>
          </div>
        </div>
        <div className='px-4'>
          <div className='relative overflow-hidden'>
            <img src={aboutPageImg.member3} alt='member3' className='block w-full' />
            <ContactPopup />
          </div>
          <div className='font-heading-2'>
            <p className={classNames('font-bold text-xl mt-2', { 'text-white': darkTheme })}>Kathryn Murphy</p>
            <p className='text-xs text-gray-500'>CREATIVE DIRECTOR</p>
          </div>
        </div>
        <div className='px-4'>
          <div className='relative overflow-hidden'>
            <img src={aboutPageImg.member4} alt='member4' className='block w-full' />
            <ContactPopup />
          </div>
          <div className='font-heading-2'>
            <p className={classNames('font-bold text-xl mt-2', { 'text-white': darkTheme })}>Guy Hawkins</p>
            <p className='text-xs text-gray-500'>DEVELOPER</p>
          </div>
        </div>
        <div className='px-4'>
          <div className='relative overflow-hidden'>
            <img src={aboutPageImg.member5} alt='member5' className='block w-full' />
            <ContactPopup />
          </div>
          <div className='font-heading-2'>
            <p className={classNames('font-bold text-xl mt-2', { 'text-white': darkTheme })}>Deli Yanky</p>
            <p className='text-xs text-gray-500'>CONSULTING OFFICER</p>
          </div>
        </div>
        <div className='px-4'>
          <div className='relative overflow-hidden'>
            <img src={aboutPageImg.member6} alt='member6' className='block w-full' />
            <ContactPopup />
          </div>
          <div className='font-heading-2'>
            <p className={classNames('font-bold text-xl mt-2', { 'text-white': darkTheme })}>Zin Denvar</p>
            <p className='text-xs text-gray-500'>SALES MANAGER</p>
          </div>
        </div>
      </Slider>
    </section>
  )
}
