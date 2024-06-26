import { Link } from 'react-router-dom'
import { categoryImg } from 'src/assets/images'
import paths from 'src/constants/paths'

export default function Category() {
  return (
    <div className='grid md:grid-cols-6 md:grid-rows-1 grid-cols-2 grid-rows-3 gap-2 rounded-md py-2 bg-transparent'>
      <Link
        to={{
          pathname: paths.shop,
          search: '?page=1&type=jacket'
        }}
        className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-gray-primary transition-colors duration-300 hover:text-pink-primary'
      >
        <img src={categoryImg.jacket} alt='jacket' className='h-[45px] block' />
        <p className='text-center text-md uppercase'>Áo khoác</p>
        <p className='text-center text-sm'>Áo khoác thời trang nam/nữ</p>
      </Link>
      <Link
        to={{
          pathname: paths.shop,
          search: '?page=1&type=male'
        }}
        className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-gray-primary transition-colors duration-300 hover:text-pink-primary'
      >
        <img src={categoryImg.male} alt='male' className='h-[45px] block' />
        <p className='text-center text-md uppercase'>Đồ nam</p>
        <p className='text-center text-sm'>Áo thun, sơ mi, quần dài, quần sort,...</p>
      </Link>
      <Link
        to={{
          pathname: paths.shop,
          search: '?page=1&type=female'
        }}
        className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-gray-primary transition-colors duration-300 hover:text-pink-primary'
      >
        <img src={categoryImg.female} alt='female' className='h-[45px] block' />
        <p className='text-center text-md uppercase'>Đồ nữ</p>
        <p className='text-center text-sm'>Áo quần, Chân váy, đầm, yếm,...</p>
      </Link>
      <Link
        to={{
          pathname: paths.shop,
          search: '?page=1&type=unisex'
        }}
        className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-gray-primary transition-colors duration-300 hover:text-pink-primary'
      >
        <img src={categoryImg.unisex} alt='unisex' className='h-[45px] block' />
        <p className='text-center text-md uppercase'>Đồ unisex</p>
        <p className='text-center text-sm'>Áo thun, sơ mi, áo khoác,...</p>
      </Link>
      <Link
        to={{
          pathname: paths.shop,
          search: '?page=1&type=accessory'
        }}
        className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-gray-primary transition-colors duration-300 hover:text-pink-primary'
      >
        <img src={categoryImg.accessory} alt='accessory' className='h-[45px] block' />
        <p className='text-center text-md uppercase'>Phụ kiện</p>
        <p className='text-center text-sm'>Balo, túi xách, nón, ví,...</p>
      </Link>
      <Link
        to={{
          pathname: paths.shop,
          search: '?page=1&sort_by=sold&order=desc'
        }}
        className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-gray-primary transition-colors duration-300 hover:text-pink-primary'
      >
        <img src={categoryImg.hot} alt='hot' className='h-[45px] block' />
        <p className='text-center text-md uppercase'>#hot</p>
        <p className='text-center text-sm'>Sản phầm đang hot</p>
      </Link>
    </div>
  )
}
