import { faCartPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

interface ProductItemType {
  image: string
  name: string
  price: number
  promotionalPrice: number
  rate: number
  sold: number
  styles: Array<string>
}

export default function ProductItem({ image, name, price, promotionalPrice, rate, sold, styles }: ProductItemType) {
  const [showStylesBar, setShowStylesBar] = useState(false)

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setShowStylesBar(true)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setShowStylesBar(false)
  }

  return (
    <div
      className='shadow-md rounded-md group'
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}
    >
      <div className='overflow-hidden relative'>
        <img src={image} alt='productItem' className='block w-full transition-transform group-hover:scale-125' />
        <AnimatePresence>
          {showStylesBar && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className='absolute left-0 right-0 bottom-0 bg-white flex justify-center items-center gap-2'>
                {styles.map((style, index) => (
                  <button key={index} className='w-8'>
                    <img src={style} alt='style' className='block w-full' />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className='p-2'>
        <p className='text-md text-center line-clamp-2'>{name}</p>
      </div>
      <p className='text-xs text-center line-through'>{formatCurrency(price)}</p>
      <p className='text-xl font-bold text-center text-greenPrimary'>{formatCurrency(promotionalPrice)}</p>
      <div className='flex justify-between items-center px-2 pb-2'>
        <div className=''>
          <div className='flex justify-center items-center'>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                let width = '0'
                if (rate - index >= 1) width = '100%'
                else if (rate - index > 0 && rate - index < 1) width = `${(rate - index) * 100}%`
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
    </div>
  )
}
