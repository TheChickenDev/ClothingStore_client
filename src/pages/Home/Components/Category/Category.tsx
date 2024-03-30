import { categoryImg } from 'src/assets/images'

export default function SearchTitle() {
  return (
    <div className='lg:px-32 md:px-16 px-4'>
      <div className='flex justify-start items-center pt-10 pb-4'>
        <span className='w-12 h-1 bg-black mx-2'></span>
        <p className='text-xl font-bold uppercase'>Bạn đang tìm kiếm?</p>
      </div>
      <div className='grid md:grid-cols-6 md:grid-rows-1 grid-cols-2 grid-rows-3 gap-2 rounded-md py-2 bg-white'>
        <button className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-[#e5ebec] transition-colors duration-300 hover:bg-yellowPrimary/70'>
          <img src={categoryImg.jacket} alt='jacket' />
          <p className='text-center text-md uppercase'>Áo khoác</p>
          <p className='text-center text-sm'>Áo khoác thời trang nam/nữ</p>
        </button>
        <button className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-[#e5ebec] transition-colors duration-300 hover:bg-yellowPrimary/70'>
          <img src={categoryImg.men} alt='men' />
          <p className='text-center text-md uppercase'>Đồ nam</p>
          <p className='text-center text-sm'>Áo thun, sơ mi, quần dài, quần sort,...</p>
        </button>
        <button className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-[#e5ebec] transition-colors duration-300 hover:bg-yellowPrimary/70'>
          <img src={categoryImg.women} alt='women' />
          <p className='text-center text-md uppercase'>Đồ nữ</p>
          <p className='text-center text-sm'>Áo quần, Chân váy, đầm, yếm,...</p>
        </button>
        <button className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-[#e5ebec] transition-colors duration-300 hover:bg-yellowPrimary/70'>
          <img src={categoryImg.unisex} alt='unisex' />
          <p className='text-center text-md uppercase'>Đồ unisex</p>
          <p className='text-center text-sm'>Áo thun, sơ mi, áo khoác,...</p>
        </button>
        <button className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-[#e5ebec] transition-colors duration-300 hover:bg-yellowPrimary/70'>
          <img src={categoryImg.accessory} alt='accessory' />
          <p className='text-center text-md uppercase'>Phụ kiện</p>
          <p className='text-center text-sm'>Balo, túi xách, nón, ví,...</p>
        </button>
        <button className='flex flex-col justify-start items-center gap-2 rounded-md p-2 bg-[#e5ebec] transition-colors duration-300 hover:bg-yellowPrimary/70'>
          <img src={categoryImg.hot} alt='hot' />
          <p className='text-center text-md uppercase'>#hot</p>
          <p className='text-center text-sm'>Sản phầm đang hot</p>
        </button>
      </div>
    </div>
  )
}
