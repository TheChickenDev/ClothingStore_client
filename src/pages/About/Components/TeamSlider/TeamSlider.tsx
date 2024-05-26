import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { aboutPageImg } from 'src/assets/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function NextArrow(props: { onClick: () => void }) {
  const { onClick } = props
  return (
    <button
      className='md:block hidden absolute z-10 top-1/2 -translate-y-1/2 right-1/3 translate-x-full bg-white p-1 rounded-full group'
      onClick={onClick}
    >
      <div className='lg:w-24 lg:h-24 w-12 h-12 border border-black text-3xl rounded-full flex justify-center items-center group-hover:bg-black group-hover:text-white duration-300'>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </button>
  )
}

function PrevArrow(props: { onClick: () => void }) {
  const { onClick } = props
  return (
    <button
      className='md:block hidden absolute z-10 top-1/2 -translate-y-1/2 left-1/3 -translate-x-full bg-white p-1 rounded-full group'
      onClick={onClick}
    >
      <div className='lg:w-24 lg:h-24 w-12 h-12 border border-black text-3xl rounded-full flex justify-center items-center group-hover:bg-black group-hover:text-white duration-300'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
    </button>
  )
}

export default function TeamSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow onClick={() => {}} />,
    prevArrow: <PrevArrow onClick={() => {}} />
  }

  return (
    <section className='md:py-24 py-12 overflow-hidden'>
      <div className='md:w-[200%] w-[300%] md:-translate-x-1/4 relative'>
        <Slider {...settings}>
          <div className='md:px-12 px-4'>
            <img src={aboutPageImg.aboutSlider1} alt='slider1' className='block w-full' />
          </div>
          <div className='md:px-12 px-4'>
            <img src={aboutPageImg.aboutSlider2} alt='slider2' className='block w-full' />
          </div>
          <div className='md:px-12 px-4'>
            <img src={aboutPageImg.aboutSlider3} alt='slider3' className='block w-full' />
          </div>
        </Slider>
      </div>
    </section>
  )
}
