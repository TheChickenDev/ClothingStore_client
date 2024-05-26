import Slider from 'react-slick'
import { aboutPageImg } from 'src/assets/images'

export default function BrandsSlider() {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 7,
    autoplay: true,
    speed: 30000,
    autoplaySpeed: 0,
    cssEase: 'linear',
    arrows: false,
    pauseOnHover: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  return (
    <section className='mt-12 sm:pt-24 pt-12'>
      <Slider {...settings}>
        <div>
          <div className='w-60 h-36 rounded-lg flex justify-center items-center border'>
            <img src={aboutPageImg.amazonLogo} alt='amazon' className='block' />
          </div>
        </div>
        <div>
          <div className='w-60 h-36 rounded-lg flex justify-center items-center border'>
            <img src={aboutPageImg.beyondLogo} alt='beyond' className='block' />
          </div>
        </div>
        <div>
          <div className='w-60 h-36 rounded-lg flex justify-center items-center border'>
            <img src={aboutPageImg.googleLogo} alt='google' className='block' />
          </div>
        </div>
        <div>
          <div className='w-60 h-36 rounded-lg flex justify-center items-center border'>
            <img src={aboutPageImg.microsoftLogo} alt='microsoft' className='block' />
          </div>
        </div>
        <div>
          <div className='w-60 h-36 rounded-lg flex justify-center items-center border'>
            <img src={aboutPageImg.olaLogo} alt='ola' className='block' />
          </div>
        </div>
        <div>
          <div className='w-60 h-36 rounded-lg flex justify-center items-center border'>
            <img src={aboutPageImg.techlifyLogo} alt='techlify' className='block' />
          </div>
        </div>
        <div>
          <div className='w-60 h-36 rounded-lg flex justify-center items-center border'>
            <img src={aboutPageImg.walmartLogo} alt='walmart' className='block' />
          </div>
        </div>
      </Slider>
      <Slider {...settings} rtl={true} className='mt-4'>
        <div>
          <div className='w-60 h-36 rounded-lg flex justify-center items-center border'>
            <img src={aboutPageImg.amazonLogo} alt='amazon' className='block' />
          </div>
        </div>
        <div>
          <div className='w-60 h-36 rounded-lg flex justify-center items-center border'>
            <img src={aboutPageImg.beyondLogo} alt='beyond' className='block' />
          </div>
        </div>
        <div>
          <div className='w-60 h-36 rounded-lg flex justify-center items-center border'>
            <img src={aboutPageImg.googleLogo} alt='google' className='block' />
          </div>
        </div>
        <div>
          <div className='w-60 h-36 rounded-lg flex justify-center items-center border'>
            <img src={aboutPageImg.microsoftLogo} alt='microsoft' className='block' />
          </div>
        </div>
        <div>
          <div className='w-60 h-36 rounded-lg flex justify-center items-center border'>
            <img src={aboutPageImg.olaLogo} alt='ola' className='block' />
          </div>
        </div>
        <div>
          <div className='w-60 h-36 rounded-lg flex justify-center items-center border'>
            <img src={aboutPageImg.techlifyLogo} alt='techlify' className='block' />
          </div>
        </div>
        <div>
          <div className='w-60 h-36 rounded-lg flex justify-center items-center border'>
            <img src={aboutPageImg.walmartLogo} alt='walmart' className='block' />
          </div>
        </div>
      </Slider>
    </section>
  )
}
