import { Link } from 'react-router-dom'
import ProductItem from 'src/components/ProductItem'
import paths from 'src/constants/paths'

export default function Outstanding() {
  return (
    <div className='lg:px-32 md:px-16 px-4'>
      <div className='flex justify-start items-center pt-10 pb-4'>
        <span className='w-12 h-1 bg-black mx-2'></span>
        <p className='text-xl font-bold uppercase'>Sản phầm nổi bật</p>
      </div>
      <div className='grid md:grid-cols-4 grid-cols-2 gap-4 bg-white py-4 rounded-md'>
        <ProductItem
          image='https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_xQgkatqpSE.jpeg'
          name='Áo khoác dù Unisex - Color Blocking Color Blocking Color Blocking Color Blocking Color Blocking Color Blocking'
          price={450000}
          promotionalPrice={300000}
          rate={0.8}
          sold={10000}
          styles={[
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_r1qDaGcF8e.jpeg',
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_0PEPFbFma0.jpeg'
          ]}
        />
        <ProductItem
          image='https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_xQgkatqpSE.jpeg'
          name='Áo khoác dù Unisex - Color Blocking'
          price={450000}
          promotionalPrice={300000}
          rate={1}
          sold={8333}
          styles={[
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_r1qDaGcF8e.jpeg',
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_0PEPFbFma0.jpeg'
          ]}
        />
        <ProductItem
          image='https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_xQgkatqpSE.jpeg'
          name='Áo khoác dù Unisex - Color Blocking'
          price={450000}
          promotionalPrice={300000}
          rate={1.6}
          sold={1000}
          styles={[
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_r1qDaGcF8e.jpeg',
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_0PEPFbFma0.jpeg'
          ]}
        />
        <ProductItem
          image='https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_xQgkatqpSE.jpeg'
          name='Áo khoác dù Unisex - Color Blocking'
          price={450000}
          promotionalPrice={300000}
          rate={2}
          sold={987}
          styles={[
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_r1qDaGcF8e.jpeg',
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_0PEPFbFma0.jpeg'
          ]}
        />
        <ProductItem
          image='https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_xQgkatqpSE.jpeg'
          name='Áo khoác dù Unisex - Color Blocking'
          price={450000}
          promotionalPrice={300000}
          rate={2.8}
          sold={123456}
          styles={[
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_r1qDaGcF8e.jpeg',
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_0PEPFbFma0.jpeg'
          ]}
        />
        <ProductItem
          image='https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_xQgkatqpSE.jpeg'
          name='Áo khoác dù Unisex - Color Blocking'
          price={450000}
          promotionalPrice={300000}
          rate={3}
          sold={10000}
          styles={[
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_r1qDaGcF8e.jpeg',
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_0PEPFbFma0.jpeg'
          ]}
        />
        <ProductItem
          image='https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_xQgkatqpSE.jpeg'
          name='Áo khoác dù Unisex - Color Blocking'
          price={450000}
          promotionalPrice={300000}
          rate={3.8}
          sold={10000}
          styles={[
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_r1qDaGcF8e.jpeg',
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_0PEPFbFma0.jpeg'
          ]}
        />
        <ProductItem
          image='https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_xQgkatqpSE.jpeg'
          name='Áo khoác dù Unisex - Color Blocking'
          price={450000}
          promotionalPrice={300000}
          rate={4.5}
          sold={10000}
          styles={[
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_r1qDaGcF8e.jpeg',
            'https://pos.nvncdn.com/d0f3ca-7136/ps/20240129_0PEPFbFma0.jpeg'
          ]}
        />
        <div className='col-span-full flex justify-center items-center py-4'>
          <Link to={paths.productList} className='block bg-orange text-black rounded-md p-4 hoverChangeTextColor'>
            Xem tất cả
          </Link>
        </div>
      </div>
    </div>
  )
}
