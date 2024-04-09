import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getProducts } from 'src/apis/product.api'
import ProductItem from 'src/components/ProductItem'
import paths from 'src/constants/paths'
import { topSaleProductQueryParams } from 'src/constants/productQueryParams'
import { Product } from 'src/types/product.type'

export default function Selling() {
  const { isLoading, data } = useQuery({
    queryKey: ['products', topSaleProductQueryParams],
    queryFn: () => getProducts(topSaleProductQueryParams)
  })

  return (
    <div className='lg:px-32 md:px-16 px-4'>
      <div className='flex justify-start items-center pt-10 pb-4'>
        <span className='w-12 h-1 bg-black mx-2'></span>
        <p className='text-xl font-bold uppercase'>Sản phẩm bán chạy</p>
      </div>
      <div className='grid md:grid-cols-4 grid-cols-2 gap-4 bg-white py-4 rounded-md'>
        {isLoading ? (
          <div>Is Loading....</div>
        ) : (
          <>
            {data?.data.data.productList.map((product: Product, index: number) => (
              <div key={index}>
                <ProductItem
                  _id={product._id}
                  img={product.img}
                  name={product.name}
                  price={product.price}
                  price_before_discount={product.price_before_discount}
                  rating={product.rating}
                  sold={product.sold}
                  thumbnail={product.thumbnail}
                />
              </div>
            ))}
            <div className='col-span-full flex justify-center items-center py-4'>
              <Link
                to={paths.productList}
                className='block bg-greenPrimary text-white rounded-md p-4 hoverChangeTextColor'
              >
                Xem tất cả
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
