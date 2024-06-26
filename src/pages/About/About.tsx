import { useContext } from 'react'
import Awards from './Components/Awards'
import BrandsSlider from './Components/BrandsSlider'
import IntroductoryVideo from './Components/IntroductoryVideo'
import MembersSlider from './Components/MembersSlider'
import Statistic from './Components/Statistic'
import TeamSlider from './Components/TeamSlider'
import { AppContext } from 'src/contexts/app.context'
import classNames from 'classnames'

export default function About() {
  const { darkTheme } = useContext(AppContext)
  return (
    <div className={classNames('py-24', { 'bg-black-theme': darkTheme })}>
      <section className='relative text-center bg-about-carousel bg-no-repeat bg-cover bg-center after:bg-purple-layer after:absolute after:inset-0'>
        <div className='relative pt-56 pb-48 text-white font-bold z-10'>
          <p className='text-6xl mb-4'>Chào mừng đến với</p>
          <p className='text-6xl mb-4'>Hein Shop</p>
        </div>
      </section>
      <section className='lg:flex block justify-between items-center gap-12 sm:px-24 px-4 sm:py-24 py-12'>
        <p
          className={classNames('text-3xl font-bold font-sp font-heading lg:w-1/3 lg:mb-0 mb-6', {
            'text-white': darkTheme
          })}
        >
          Bắt đầu với phong cách riêng biệt, độc đáo.
        </p>
        <p
          className={classNames('font-heading text-justify lg:w-2/3', {
            'text-white': darkTheme,
            'text-gray-700': !darkTheme
          })}
        >
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
      <TeamSlider />
      <Awards />
      <IntroductoryVideo />
      <MembersSlider />
      <BrandsSlider />
    </div>
  )
}
