import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { carouselImg } from 'src/assets/images'

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const carouselIndexRef = useRef(1)

  const handleTransitionEnd = () => {
    const carousel = carouselRef.current
    if (carousel) {
      if (carouselIndexRef.current === 0) {
        carousel.prepend(carousel.childNodes[3])
      } else {
        carousel.appendChild(carousel.childNodes[0])
      }
      carousel.style.transition = 'none'
      carousel.style.transform = 'translateX(-100%)'
      setTimeout(() => {
        carousel.style.transition = 'transform linear 0.5s'
        setCarouselIndex(1)
      })
    }
  }

  const handleChangeCarousel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, isLeftBtn: boolean) => {
    e?.preventDefault()
    setCarouselIndex(isLeftBtn ? 0 : 2)
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel?.addEventListener('transitionend', handleTransitionEnd)
      setTimeout(() => {
        carousel.style.transition = 'transform linear 0.5s'
      })

      let changeToLeft = false
      let startPos: number
      carousel.addEventListener('touchstart', (e) => {
        e.preventDefault()
        startPos = e.touches[0].clientX
        setIsDragging(true)
      })
      carousel.addEventListener('touchmove', (e) => {
        e.preventDefault()
        const pos = e.touches[0].clientX
        if (pos > startPos + 30) {
          carousel.style.transform = `translateX(${-100 * carouselIndex + (pos - startPos) / 3}%)`
          changeToLeft = true
        } else if (pos < startPos - 30) {
          carousel.style.transform = `translateX(${-100 * carouselIndex + (pos - startPos) / 3}%)`
          changeToLeft = false
        }
      })
      carousel.addEventListener('touchend', (e) => {
        e.preventDefault()
        handleChangeCarousel(null, changeToLeft)
        setIsDragging(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (carouselRef.current && carouselIndex !== 1) {
      carouselIndexRef.current = carouselIndex
      carouselRef.current.style.transform = `translateX(${carouselIndex * -100}%)`
    }
    const timeOut = setTimeout(() => {
      if (!isDragging) setCarouselIndex(2)
      else return () => clearTimeout(timeOut)
    }, 2000)
    return () => clearTimeout(timeOut)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselIndex, isDragging])

  return (
    <div className='w-full overflow-hidden relative z-10'>
      <button
        className='sm:block hidden absolute top-1/2 translate-y-[-50%] left-10 text-xl z-50 bg-gray-100/50 px-4 py-2 cursor-pointer rounded-full hover:bg-gray-100/80'
        onClick={(e) => handleChangeCarousel(e, true)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button
        className='sm:block hidden absolute top-1/2 translate-y-[-50%] right-10 text-xl z-50 bg-gray-100/50 px-4 py-2 cursor-pointer rounded-full hover:bg-gray-100/80'
        onClick={(e) => handleChangeCarousel(e, false)}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
      <div className='flex translate-x-[-100%]' ref={carouselRef}>
        <div className='min-w-full'>
          <img src={carouselImg.carousel1} alt='carousel1' className='block w-full h-full' />
        </div>
        <div className='min-w-full'>
          <img src={carouselImg.carousel2} alt='carousel2' className='block w-full h-full' />
        </div>
        <div className='min-w-full'>
          <img src={carouselImg.carousel3} alt='carousel3' className='block w-full h-full' />
        </div>
        <div className='min-w-full'>
          <img src={carouselImg.carousel4} alt='carousel4' className='block w-full h-full' />
        </div>
      </div>
    </div>
  )
}
