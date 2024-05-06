import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Carousel from './Components/Carousel'
import Category from './Components/Category'
import New from './Components/New'
import Outstanding from './Components/Outstanding'
import Selling from './Components/Selling'
import Voucher from './Components/Voucher'
import { Link } from 'react-router-dom'
import paths from 'src/constants/paths'

export default function Home() {
  const [categoryIndex, setCategoryIndex] = useState<number>(0)
  const categoryBtnListRef = useRef<HTMLDivElement>(null)

  const handleCategoryBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    e.preventDefault()
    const categoryBtns = categoryBtnListRef.current?.children
    categoryBtns?.item(categoryIndex)?.classList.remove('text-pink-primary')
    setCategoryIndex(index)
  }

  useEffect(() => {
    const categoryBtns = categoryBtnListRef.current?.children
    categoryBtns?.item(categoryIndex)?.classList.add('text-pink-primary')
  }, [categoryIndex])

  return (
    <div className='mt-24'>
      <Carousel />
      <div className='lg:px-32 md:px-16 px-4'>
        <div className='pl-4 mt-12 mb-4 border-l-4 border-l-pink-primary'>
          <p className='text-xl font-bold uppercase'>Bạn đang tìm kiếm?</p>
        </div>
        <Category />
        <div className='sm:flex sm:justify-between sm:items-center mt-12 mb-4'>
          <div className='pl-4 border-l-4 border-l-pink-primary'>
            <p className='text-xl font-bold uppercase'>Sản phẩm phổ biến</p>
          </div>
          <div
            className='flex sm:justify-center justify-start items-center gap-5 sm:mt-0 mt-6'
            ref={categoryBtnListRef}
          >
            <button
              className='relative p-1 overflow-hidden transition-colors duration-500 text-sm text-gray-700'
              onClick={(e) => handleCategoryBtnClick(e, 0)}
            >
              Đánh giá cao
              <AnimatePresence>
                {categoryIndex === 0 && (
                  <motion.div
                    initial={{ x: -200 }}
                    animate={{ x: [-200, 0], transition: { duration: 0.5 } }}
                    exit={{ x: [0, 200], transition: { duration: 1.5 } }}
                    className='absolute bottom-0 left-0 right-0 h-[2px] bg-pink-primary'
                  >
                    <div></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <button
              className='relative p-1 overflow-hidden transition-colors duration-500 text-sm text-gray-700'
              onClick={(e) => handleCategoryBtnClick(e, 1)}
            >
              Bán chạy
              <AnimatePresence>
                {categoryIndex === 1 && (
                  <motion.div
                    initial={{ x: -200 }}
                    animate={{ x: [-200, 0], transition: { duration: 0.5 } }}
                    exit={{ x: [0, 200], transition: { duration: 1.5 } }}
                    className='absolute bottom-0 left-0 right-0 h-[2px] bg-pink-primary'
                  >
                    <div></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <button
              className='relative p-1 overflow-hidden transition-colors duration-500 text-sm text-gray-700'
              onClick={(e) => handleCategoryBtnClick(e, 2)}
            >
              Mới nhất
              <AnimatePresence>
                {categoryIndex === 2 && (
                  <motion.div
                    initial={{ x: -200 }}
                    animate={{ x: [-200, 0], transition: { duration: 0.5 } }}
                    exit={{ x: [0, 200], transition: { duration: 1.5 } }}
                    className='absolute bottom-0 left-0 right-0 h-[2px] bg-pink-primary'
                  >
                    <div></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
        <Outstanding categoryShowedIndex={categoryIndex} />
        <Selling categoryShowedIndex={categoryIndex} />
        <New categoryShowedIndex={categoryIndex} />
        <div className='sm:flex sm:justify-between sm:items-center mt-12 mb-4'>
          <div className='pl-4 border-l-4 border-l-pink-primary'>
            <p className='text-xl font-bold uppercase'>Chương trình giảm giá</p>
          </div>
          <Link
            to={{
              pathname: paths.shop,
              search: '?page=1'
            }}
            className='block text-green w-36 text-center text-sm text-white p-4 bg-pink-primary mt-4 sm:mt-0 hover:bg-purple-primary transition-colors duration-300'
          >
            Mua ngay
          </Link>
        </div>
        <Voucher />
      </div>
    </div>
  )
}
