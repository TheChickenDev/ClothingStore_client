import { faCartPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

type T = Product & { isGridView: boolean }

export default function ProductItem({
  _id,
  img,
  name,
  price,
  price_before_discount,
  rating,
  sold,
  thumbnail,
  isGridView
}: T) {
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

  const handleChangeImageClick = (
    image: string,
    index: number,
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const imgTag = imageRef.current
    if (imgTag) {
      imgTag.style.transform = 'scale(0.75)'
      imgTag.style.opacity = '0'
      setTimeout(() => {
        setCurrentImage(image)
        setCurrentThumbnail(index)
        imgTag.style.transform = ''
        imgTag.style.opacity = ''
      }, 500)
    }
  }

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Add to cart')
  }

  return (
    <Link
      to={`/product/${_id}`}
      className={`${isGridView ? 'block' : 'flex justify-between items-center mt-4'} shadow-md rounded-md group overflow-hidden`}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}
    >
      <div className={`${isGridView ? 'w-full' : 'w-1/5'} overflow-hidden relative`}>
        <div
          className={classNames('w-full flex items-center', {
            'min-h-[460px]': isGridView
          })}
        >
          <img
            ref={imageRef}
            src={currentImage}
            alt='productItem'
            className='block w-full transition-all duration-500 group-hover:scale-125'
          />
        </div>
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
                    className={classNames('w-12 px-1', {
                      'transition-all border-2 border-pink-primary': currentThumbnail === index
                    })}
                    onClick={(e) => handleChangeImageClick(style.url, index, e)}
                  >
                    <img src={style.url} alt='style' className='block w-full' />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={`${isGridView ? 'text-center p-2' : 'w-4/5 p-12'}`}>
        <p className='text-md line-clamp-2 min-h-10'>{name}</p>
        <p className='text-xs line-through mt-2'>{formatCurrency(price_before_discount)}</p>
        <p className='text-xl font-bold text-green-primary mb-2'>{formatCurrency(price)}</p>
        <div className='flex justify-between items-center'>
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
                      <div
                        className='text-yellow-primary absolute top-0 left-0 overflow-hidden'
                        style={{ width: width }}
                      >
                        <FontAwesomeIcon icon={faStar} />
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className=''>{formatNumberToSocialStyle(sold) + ' đã bán'}</div>
          </div>
          <button
            className='text-xl px-4 py-1 border rounded-md transition-colors duration-300 hover:text-pink-primary'
            onClick={(e) => handleAddToCartClick(e)}
          >
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
        </div>
      </div>
    </Link>
  )
}
