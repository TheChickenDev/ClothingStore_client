import Carousel from './Components/Carousel'
import SearchTitle from './Components/Category'
import News from './Components/News'
import Outstanding from './Components/Outstanding'

export default function Home() {
  return (
    <div className='sm:mt-[164px] mt-20'>
      <Carousel />
      <SearchTitle />
      <Outstanding />
      <News />
    </div>
  )
}
