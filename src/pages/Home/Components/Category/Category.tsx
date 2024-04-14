import { categoryImg } from 'src/assets/images'

export default function Category() {
  return (
    <div className='grid md:grid-cols-6 md:grid-rows-1 grid-cols-2 grid-rows-3 gap-2 rounded-md py-2 bg-white'>
      <button className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-gray-primary transition-colors duration-300 hover:bg-pink-primary/10'>
        <img src={categoryImg.jacket} alt='jacket' className='h-[45px] block' />
        <p className='text-center text-md uppercase'>Áo khoác</p>
        <p className='text-center text-sm'>Áo khoác thời trang nam/nữ</p>
      </button>
      <button className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-gray-primary transition-colors duration-300 hover:bg-pink-primary/10'>
        <img src={categoryImg.men} alt='men' className='h-[45px] block' />
        <p className='text-center text-md uppercase'>Đồ nam</p>
        <p className='text-center text-sm'>Áo thun, sơ mi, quần dài, quần sort,...</p>
      </button>
      <button className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-gray-primary transition-colors duration-300 hover:bg-pink-primary/10'>
        <img src={categoryImg.women} alt='women' className='h-[45px] block' />
        <p className='text-center text-md uppercase'>Đồ nữ</p>
        <p className='text-center text-sm'>Áo quần, Chân váy, đầm, yếm,...</p>
      </button>
      <button className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-gray-primary transition-colors duration-300 hover:bg-pink-primary/10'>
        <img src={categoryImg.unisex} alt='unisex' className='h-[45px] block' />
        <p className='text-center text-md uppercase'>Đồ unisex</p>
        <p className='text-center text-sm'>Áo thun, sơ mi, áo khoác,...</p>
      </button>
      <button className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-gray-primary transition-colors duration-300 hover:bg-pink-primary/10'>
        <img src={categoryImg.accessory} alt='accessory' className='h-[45px] block' />
        <p className='text-center text-md uppercase'>Phụ kiện</p>
        <p className='text-center text-sm'>Balo, túi xách, nón, ví,...</p>
      </button>
      <button className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-gray-primary transition-colors duration-300 hover:bg-pink-primary/10'>
        <img src={categoryImg.hot} alt='hot' className='h-[45px] block' />
        <p className='text-center text-md uppercase'>#hot</p>
        <p className='text-center text-sm'>Sản phầm đang hot</p>
      </button>
    </div>
  )
}
