import { faBars, faBorderAll } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { Product, ProductSearchParams } from 'src/types/product.type'
import { getProducts } from 'src/apis/product.api'
import ProductItem from 'src/components/ProductItem'
import useQueryParams from 'src/hooks/useQueryParams'
import paths from 'src/constants/paths'
import Pagination from './Components/Pagination/Pagination'

export default function Shop() {
  const queryParams: ProductSearchParams | undefined = useQueryParams()
  const currentPage: number = Number(queryParams?.page)
  const selectRef = useRef<HTMLSelectElement>(null)
  const [isGridView, setIsGridView] = useState<boolean>(true)
  const { isLoading, data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => getProducts(queryParams)
  })

  const navigate = useNavigate()

  const handleFilter = (newParams: ProductSearchParams) => {
    scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      navigate({
        pathname: paths.shop,
        search: createSearchParams({ ...queryParams, ...newParams }).toString()
      })
    }, 500)
  }

  const handleSort = () => {
    const selectTag = selectRef.current
    const values = selectTag?.value.split(' ')
    if (!values) return
    const newParams: ProductSearchParams = {}
    if (values[0]) {
      newParams.sort_by = values[0]
    }
    if (values[1]) {
      newParams.order = values[1]
    } else {
      newParams.order = 'desc'
    }
    handleFilter(newParams)
  }

  return (
    <div className='py-32 lg:px-32 md:px-16 px-4'>
      <>
        <div className='sm:flex justify-between items-center border px-4 py-2'>
          <p className='my-2'>
            Hiển thị trang {data?.data.data.currentPage}/{data?.data.data.totalPage}
          </p>
          <div className='flex justify-start items-center gap-4'>
            <button
              className={classNames('text-2xl hover:text-pink-primary duration-300', {
                'text-pink-primary': isGridView
              })}
              onClick={() => setIsGridView(true)}
            >
              <FontAwesomeIcon icon={faBorderAll} />
            </button>
            <button
              className={classNames('text-2xl hover:text-pink-primary duration-300', {
                'text-pink-primary': !isGridView
              })}
              onClick={() => setIsGridView(false)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <select
              className='flex justify-between items-center w-44 py-2 border relative'
              name='sort'
              onChange={handleSort}
              ref={selectRef}
            >
              <option value={'all'}>Tất cả</option>
              <option value={'updatedAt'}>Sản phẩm mới</option>
              <option value={'view'}>Phổ biến</option>
              <option value={'sold'}>Bán chạy</option>
              <option value={'price desc'}>Giá cao tới thấp</option>
              <option value={'price asc'}>Giá thấp tới cao</option>
            </select>
          </div>
        </div>
        <div className='flex sm:flex-row flex-col-reverse gap-8 mt-12'>
          <div className='w-full sm:w-1/4 border'>Search block</div>
          {isLoading ? (
            <div className='w-full sm:w-3/4 min-h-96 flex justify-center items-center'>
              <div className='loader'></div>
            </div>
          ) : (
            <div
              className={classNames('w-full sm:w-3/4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8', {
                grid: isGridView
              })}
            >
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
                    isGridView={isGridView}
                  />
                </div>
              ))}
              <Pagination
                totalPage={Number(data?.data.data.totalPage)}
                currentPage={currentPage}
                queryParams={queryParams}
              />
            </div>
          )}
        </div>
      </>
    </div>
  )
}
