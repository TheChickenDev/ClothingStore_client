import { faCartPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

export default function ProductItem({
  _id,
  img,
  name,
  price,
  price_before_discount,
  rating,
  sold,
  thumbnail
}: Product) {
  const [showStylesBar, setShowStylesBar] = useState<boolean>(false)
  const [currentImage, setCurrentImage] = useState<string>(img)
  const [currentThumbnail, setCurrentThumbnail] = useState<number>(0)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    setShowStylesBar(true)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    setShowStylesBar(false)
  }

  const handleChangeImageClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, img: string, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    const imgTag = imageRef.current
    if (imgTag) {
      imgTag.style.transform = 'scale(0.75)'
      imgTag.style.opacity = '0'
      setTimeout(() => {
        setCurrentImage(img)
        setCurrentThumbnail(index)
        imgTag.style.transform = ''
        imgTag.style.opacity = ''
      }, 500)
    }
  }

  return (
    <Link
      to={`/product/${_id}`}
      className='block shadow-md rounded-md group'
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}
    >
      <div className='overflow-hidden relative'>
        <img
          ref={imageRef}
          src={currentImage}
          alt='productItem'
          className='block w-full transition-all duration-500 group-hover:scale-125'
        />
        <AnimatePresence>
          {showStylesBar && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: [100, 0] }}
              exit={{ opacity: 0, y: [0, 100] }}
            >
              <div className='absolute left-0 right-0 bottom-0 bg-white flex justify-center items-center'>
                {[{ url: img, path: '' }, ...thumbnail].map((style, index) => (
                  <button
                    key={index}
                    className={`w-12 px-1 ${currentThumbnail === index ? 'transition-all border-2 border-yellowPrimary' : ''}`}
                    onClick={(e) => handleChangeImageClick(e, style.url, index)}
                  >
                    <img src={style.url} alt='style' className='block w-full' />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className='p-2'>
        <p className='text-md text-center line-clamp-2 min-h-10'>{name}</p>
      </div>
      <p className='text-xs text-center line-through'>{formatCurrency(price_before_discount)}</p>
      <p className='text-xl font-bold text-center text-greenPrimary'>{formatCurrency(price)}</p>
      <div className='flex justify-between items-center px-2 pb-2'>
        <div>
          <div className='flex justify-start items-center'>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                let width = '0'
                if (rating - index >= 1) width = '100%'
                else if (rating - index > 0 && rating - index < 1) width = `${(rating - index) * 100}%`
                return (
                  <div key={index} className='relative text-xs'>
                    <div className='text-gray-300'>
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                    <div className='text-yellowPrimary absolute top-0 left-0 overflow-hidden' style={{ width: width }}>
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                  </div>
                )
              })}
          </div>
          <div className=''>{formatNumberToSocialStyle(sold) + ' đã bán'}</div>
        </div>
        <button className='text-xl px-4 py-1 border rounded-md transition-colors duration-300 hover:text-yellowPrimary'>
          <FontAwesomeIcon icon={faCartPlus} />
        </button>
      </div>
    </Link>
  )
}
