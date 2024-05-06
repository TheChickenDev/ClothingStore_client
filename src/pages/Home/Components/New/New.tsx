import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { getProducts } from 'src/apis/product.api'
import ProductItem from 'src/components/ProductItem'
import { latestProductQueryParams } from 'src/constants/productQueryParams'
import { Product } from 'src/types/product.type'

export default function New({ categoryShowedIndex }: { categoryShowedIndex: number }) {
  const { isLoading, data } = useQuery({
    queryKey: ['products', latestProductQueryParams],
    queryFn: () => getProducts(latestProductQueryParams)
  })

  return (
    categoryShowedIndex === 2 && (
      <motion.div initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: [200, 0] }}>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white py-2'>
          {isLoading ? (
            <div className='col-span-1 sm:col-span-2 lg:col-span-4 min-h-96 flex justify-center items-center'>
              <div className='loader'></div>
            </div>
          ) : (
            <>
              {data?.data.data.products.map((product: Product, index: number) => (
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
                    isGridView={true}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </motion.div>
    )
  )
}
