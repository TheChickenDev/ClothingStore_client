import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

interface SidebarFilterProps {
  handleChooseType: (type: string) => void
  handleChoosePrice: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChooseRating: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleResetFilter: () => void
  type: string
}

export default function SidebarFilter({
  handleChooseType,
  handleChoosePrice,
  handleChooseRating,
  handleResetFilter,
  type
}: SidebarFilterProps) {
  return (
    <>
      <div className='w-full mb-5'>
        <button className='w-full text-left p-2 border-b hover:text-pink-primary'>Loại</button>
        <ul className='list-disc mx-6 my-2 text-sm text-nowrap'>
          <li>
            <button
              className={classNames('pr-2 py-2 hover:text-pink-primary', { 'text-pink-primary': type === 'male' })}
              onClick={() => handleChooseType('male')}
            >
              Quần áo nam
            </button>
          </li>
          <li>
            <button
              className={classNames('pr-2 py-2 hover:text-pink-primary', { 'text-pink-primary': type === 'female' })}
              onClick={() => handleChooseType('female')}
            >
              Quần áo nữ
            </button>
          </li>
          <li>
            <button
              className={classNames('pr-2 py-2 hover:text-pink-primary', { 'text-pink-primary': type === 'unisex' })}
              onClick={() => handleChooseType('unisex')}
            >
              Unisex
            </button>
          </li>
          <li>
            <button
              className={classNames('pr-2 py-2 hover:text-pink-primary', { 'text-pink-primary': type === 'jacket' })}
              onClick={() => handleChooseType('jacket')}
            >
              Áo khoác
            </button>
          </li>
          <li>
            <button
              className={classNames('pr-2 py-2 hover:text-pink-primary', { 'text-pink-primary': type === 'accessory' })}
              onClick={() => handleChooseType('accessory')}
            >
              Phụ kiện
            </button>
          </li>
        </ul>
      </div>
      <div className='w-full mb-5'>
        <button className='w-full text-left p-2 border-b hover:text-pink-primary'>Giá</button>
        <div className='mx-2 my-2 text-sm text-nowrap'>
          <div className='py-2'>
            <input type='radio' id='price-one' name='price' onChange={handleChoosePrice} />
            <label htmlFor='price-one' className='hover:text-pink-primary cursor-pointer'>
              1.000đ - 50.000đ
            </label>
          </div>
          <div className='py-2'>
            <input type='radio' id='price-two' name='price' onChange={handleChoosePrice} />
            <label htmlFor='price-two' className='hover:text-pink-primary cursor-pointer'>
              51.000đ - 100.000đ
            </label>
          </div>
          <div className='py-2'>
            <input type='radio' id='price-three' name='price' onChange={handleChoosePrice} />
            <label htmlFor='price-three' className='hover:text-pink-primary cursor-pointer'>
              101.000đ - 150.000đ
            </label>
          </div>
          <div className='py-2'>
            <input type='radio' id='price-four' name='price' onChange={handleChoosePrice} />
            <label htmlFor='price-four' className='hover:text-pink-primary cursor-pointer'>
              151.000đ - 200.000đ
            </label>
          </div>
          <div className='py-2'>
            <input type='radio' id='price-five' name='price' onChange={handleChoosePrice} />
            <label htmlFor='price-five' className='hover:text-pink-primary cursor-pointer'>
              {'> 200.000đ'}
            </label>
          </div>
        </div>
      </div>
      <div className='w-full mb-5'>
        <button className='w-full text-left p-2 border-b hover:text-pink-primary'>Đánh giá</button>
        <div className='mx-2 my-2 text-sm text-nowrap'>
          <div className='py-2'>
            <input type='radio' id='rating-one' name='rating' onChange={handleChooseRating} />
            <label htmlFor='rating-one' className='hover:text-pink-primary cursor-pointer'>
              {}
              <FontAwesomeIcon icon={faStar} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStarRegular} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStarRegular} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStarRegular} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStarRegular} className='text-yellow-primary' />
            </label>
          </div>
          <div className='py-2'>
            <input type='radio' id='rating-two' name='rating' onChange={handleChooseRating} />
            <label htmlFor='rating-two' className='hover:text-pink-primary cursor-pointer'>
              {}
              <FontAwesomeIcon icon={faStar} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStar} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStarRegular} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStarRegular} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStarRegular} className='text-yellow-primary' />
            </label>
          </div>
          <div className='py-2'>
            <input type='radio' id='rating-three' name='rating' onChange={handleChooseRating} />
            <label htmlFor='rating-three' className='hover:text-pink-primary cursor-pointer'>
              {}
              <FontAwesomeIcon icon={faStar} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStar} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStar} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStarRegular} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStarRegular} className='text-yellow-primary' />
            </label>
          </div>
          <div className='py-2'>
            <input type='radio' id='rating-four' name='rating' onChange={handleChooseRating} />
            <label htmlFor='rating-four' className='hover:text-pink-primary cursor-pointer'>
              {}
              <FontAwesomeIcon icon={faStar} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStar} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStar} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStar} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStarRegular} className='text-yellow-primary' />
            </label>
          </div>
          <div className='py-2'>
            <input type='radio' id='rating-five' name='rating' onChange={handleChooseRating} />
            <label htmlFor='rating-five' className='hover:text-pink-primary cursor-pointer'>
              {}
              <FontAwesomeIcon icon={faStar} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStar} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStar} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStar} className='text-yellow-primary' />
              <FontAwesomeIcon icon={faStar} className='text-yellow-primary' />
            </label>
          </div>
        </div>
      </div>
      <button
        className='block w-full text-center text-sm text-white p-4 bg-pink-primary mt-4 sm:mt-0 hover:bg-purple-primary transition-colors duration-300'
        onClick={handleResetFilter}
      >
        Đặt lại bộ lọc
      </button>
    </>
  )
}
