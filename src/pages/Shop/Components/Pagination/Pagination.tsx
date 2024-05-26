import { Link, createSearchParams } from 'react-router-dom'
import paths from 'src/constants/paths'
import { ProductSearchParams } from 'src/types/product.type'
import classnames from 'classnames'

const PAGE_RANGE = 1
export default function Pagination({
  totalPage,
  currentPage,
  queryParams,
  darkTheme
}: {
  totalPage: number
  currentPage: number
  queryParams: ProductSearchParams
  darkTheme: boolean
}) {
  let threeDotsAfter: boolean = false
  let threeDotsBefore: boolean = false

  const displayDotsAfter = (page: number) => {
    if (threeDotsAfter) return null
    threeDotsAfter = true
    return (
      <div key={page} className='w-8 h-8 flex justify-center items-center m-2 border'>
        ...
      </div>
    )
  }
  const displayDotsBefore = (page: number) => {
    if (threeDotsBefore) return null
    threeDotsBefore = true
    return (
      <div key={page} className='w-8 h-8 flex justify-center items-center m-2 border'>
        ...
      </div>
    )
  }
  return (
    <div
      className={classnames('flex flex-wrap justify-center text-center col-span-full mt-12', {
        'text-white': darkTheme
      })}
    >
      {totalPage &&
        [...Array(totalPage).keys()].map((page) => {
          const pageNumber = page + 1
          if (
            pageNumber <= totalPage - PAGE_RANGE &&
            pageNumber > PAGE_RANGE &&
            pageNumber > currentPage + PAGE_RANGE
          ) {
            return displayDotsAfter(page)
          }
          if (
            pageNumber <= totalPage - PAGE_RANGE &&
            pageNumber > PAGE_RANGE &&
            pageNumber < currentPage - PAGE_RANGE
          ) {
            return displayDotsBefore(page)
          }
          return (
            <Link
              to={{
                pathname: paths.shop,
                search: createSearchParams({ ...queryParams, page: pageNumber.toString() }).toString()
              }}
              key={page}
              className={classnames('w-8 h-8 flex justify-center items-center m-2 border', {
                'border-pink-primary scale-125 pointer-events-none': currentPage === pageNumber
              })}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {page + 1}
            </Link>
          )
        })}
    </div>
  )
}
