import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import debounce from 'lodash.debounce'
import { Product, ProductSearchParams } from 'src/types/product.type'
import { getProducts } from 'src/apis/product.api'
import ProductItem from 'src/components/ProductItem'
import useQueryParams from 'src/hooks/useQueryParams'
import paths from 'src/constants/paths'
import Pagination from './Components/Pagination'
import TopbarFilter from './Components/TopbarFilter'
import SidebarFilter from './Components/SidebarFilter'
import NavigationTree from 'src/components/NavigationTree'

export default function Shop() {
  const queryParams: ProductSearchParams | undefined = useQueryParams()
  const currentPage: number = Number(queryParams?.page)
  const selectRef = useRef<HTMLSelectElement>(null)
  const [isGridView, setIsGridView] = useState<boolean>(true)
  const [type, setType] = useState<string>('')
  const { isLoading, data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => getProducts(queryParams)
  })

  const navigate = useNavigate()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilter = useCallback(
    debounce((newParams: ProductSearchParams) => {
      scrollTo({ top: 0, behavior: 'smooth' })
      navigate({
        pathname: paths.shop,
        search: createSearchParams({ ...queryParams, ...newParams, page: '1' }).toString()
      })
    }, 500),
    [queryParams]
  )

  const handleSort = () => {
    const selectTag = selectRef.current
    const values = selectTag?.value.split(' ')
    if (!values) return
    const newParams: ProductSearchParams = {}
    if (values[0] !== 'all') {
      if (values[0]) {
        newParams.sort_by = values[0]
      }
      if (values[1]) {
        newParams.order = values[1]
      } else {
        newParams.order = 'desc'
      }
    } else {
      delete queryParams.sort_by
      delete queryParams.order
    }
    handleFilter(newParams)
  }

  const handleChooseType = (type: string) => {
    setType(type)
    handleFilter({ type })
  }

  useEffect(() => {}, [])

  const handleChoosePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'price-one':
        handleFilter({ price_min: '1000', price_max: '50000' })

        break
      case 'price-two':
        handleFilter({ price_min: '51000', price_max: '100000' })

        break
      case 'price-three':
        handleFilter({ price_min: '101000', price_max: '150000' })

        break
      case 'price-four':
        handleFilter({ price_min: '151000', price_max: '200000' })

        break
      case 'price-five':
        delete queryParams.price_max
        handleFilter({ price_min: '200000' })

        break
      default:
        break
    }
  }

  const handleChooseRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'rating-one':
        handleFilter({ rating_filter: '1' })
        break
      case 'rating-two':
        handleFilter({ rating_filter: '2' })
        break
      case 'rating-three':
        handleFilter({ rating_filter: '3' })
        break
      case 'rating-four':
        handleFilter({ rating_filter: '4' })
        break
      case 'rating-five':
        handleFilter({ rating_filter: '5' })
        break
      default:
        break
    }
  }

  useEffect(() => {
    const { price_min, rating_filter, order, sort_by, type } = queryParams
    switch (price_min) {
      case '1000':
        document.getElementById('price-one')?.setAttribute('checked', 'true')
        break
      case '51000':
        document.getElementById('price-two')?.setAttribute('checked', 'true')
        break
      case '101000':
        document.getElementById('price-three')?.setAttribute('checked', 'true')
        break
      case '151000':
        document.getElementById('price-four')?.setAttribute('checked', 'true')
        break
      case '200000':
        document.getElementById('price-five')?.setAttribute('checked', 'true')
        break
    }
    switch (rating_filter) {
      case '1':
        document.getElementById('rating-one')?.setAttribute('checked', 'true')
        break
      case '2':
        document.getElementById('rating-two')?.setAttribute('checked', 'true')
        break
      case '3':
        document.getElementById('rating-three')?.setAttribute('checked', 'true')
        break
      case '4':
        document.getElementById('rating-four')?.setAttribute('checked', 'true')
        break
      case '5':
        document.getElementById('rating-five')?.setAttribute('checked', 'true')
        break
    }
    switch (sort_by) {
      case 'updatedAt':
        selectRef.current?.options[1].setAttribute('selected', 'true')
        break
      case 'view':
        selectRef.current?.options[2].setAttribute('selected', 'true')
        break
      case 'sold':
        selectRef.current?.options[3].setAttribute('selected', 'true')
        break
      case 'price':
        if (order === 'desc') {
          selectRef.current?.options[4].setAttribute('selected', 'true')
        } else {
          selectRef.current?.options[5].setAttribute('selected', 'true')
        }
        break
      default:
        selectRef.current?.options[0].setAttribute('selected', 'true')
    }
    setType(type ?? '')
  }, [queryParams])

  const handleResetFilter = () => {
    document.getElementsByName('price').forEach((element) => ((element as HTMLInputElement).checked = false))
    document.getElementsByName('rating').forEach((element) => ((element as HTMLInputElement).checked = false))
    delete queryParams.type
    delete queryParams.price_min
    delete queryParams.price_max
    delete queryParams.rating_filter
    handleFilter({})
  }

  return (
    <div className='py-28 lg:px-32 md:px-8 px-4'>
      <>
        <NavigationTree
          tree={[
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/shop' }
          ]}
          currentPath='/shop'
        />
        <TopbarFilter
          currentPage={data?.data.data.currentPage}
          totalPage={data?.data.data.totalPage}
          isGridView={isGridView}
          setIsGridView={setIsGridView}
          selectRef={selectRef}
          handleSort={handleSort}
        />
        <div className='flex md:flex-row flex-col-reverse gap-8 mt-12'>
          <div className='w-full md:w-1/4'>
            <SidebarFilter
              handleChooseType={handleChooseType}
              handleChoosePrice={handleChoosePrice}
              handleChooseRating={handleChooseRating}
              handleResetFilter={handleResetFilter}
              type={type}
            />
          </div>
          {isLoading ? (
            <div className='w-full md:w-3/4 min-h-96 flex justify-center items-center'>
              <div className='loader'></div>
            </div>
          ) : data?.data.data.totalPage === 0 ? (
            <div className='w-full md:w-3/4 min-h-96 flex justify-center items-center'>Không có sản phẩm nào!</div>
          ) : (
            <div
              className={classNames('w-full md:w-3/4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8', {
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
