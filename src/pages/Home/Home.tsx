import Carousel from './Components/Carousel'
import SearchTitle from './Components/Category'
import New from './Components/New'
import Outstanding from './Components/Outstanding'
import Selling from './Components/Selling'

export default function Home() {
  return (
    <div className='sm:mt-[164px] mt-20'>
      <Carousel />
      <SearchTitle />
      <Outstanding />
      <New />
      <Selling />
    </div>
  )
}
