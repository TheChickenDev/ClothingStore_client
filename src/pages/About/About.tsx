import Statistic from './Components/Statistic'

export default function About() {
  return (
    <div className='py-24'>
      <section className='relative text-center bg-about-carousel bg-no-repeat bg-cover bg-center after:bg-purple-layer after:absolute after:inset-0'>
        <div className='relative pt-56 pb-48 text-white z-10'>
          <p className='mb-4'>Về chúng tôi</p>
          <p className='text-6xl'>Chào mừng đến với</p>
          <p className='text-6xl'>Hein Shop</p>
        </div>
      </section>
      <section className='lg:flex block justify-between items-center gap-12 sm:px-24 px-4 py-24'>
        <p className='text-3xl font-bold font-sp font-heading lg:w-1/3 lg:mb-0 mb-6'>
          Bắt đầu với phong cách riêng biệt, độc đáo.
        </p>
        <p className='font-heading text-justify text-gray-700 lg:w-2/3'>
          Với niềm đam mê về vẻ đẹp cá nhân, chúng tôi cam kết đem đến những sản phẩm chất lượng nhất, từ những trang
          phục hàng ngày đến những thiết kế đặc biệt cho những dịp đặc biệt. Hãy khám phá và tìm kiếm phong cách của
          riêng bạn tại đây!
          <br />
          <br />
          Tại đây, chúng tôi không chỉ bán đồ, mà còn mang đến cho bạn một trải nghiệm thú vị về thời trang. Với sự đa
          dạng và phóng khoáng trong phong cách, chúng tôi tự hào giới thiệu những bộ sưu tập độc đáo, phản ánh cá tính
          và gu thẩm mỹ đa chiều của mỗi người. Hãy khám phá cùng chúng tôi và tìm kiếm những điều mới mẻ, độc đáo để
          làm mới phong cách của bạn!
        </p>
      </section>
      <Statistic />
    </div>
  )
}
