import { faBars, faBorderAll } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

interface TopbarFilterProps {
  currentPage: number | undefined
  totalPage: number | undefined
  isGridView: boolean
  setIsGridView: (value: boolean) => void
  selectRef: React.RefObject<HTMLSelectElement>
  handleSort: () => void
  darkTheme: boolean
}

export default function TopbarFilter({
  currentPage,
  totalPage,
  isGridView,
  setIsGridView,
  selectRef,
  handleSort,
  darkTheme
}: TopbarFilterProps) {
  return (
    <div className={classNames('sm:flex justify-between items-center border px-4 py-2', { 'text-white': darkTheme })}>
      <p className='my-2'>
        Hiển thị trang {totalPage ?? 0 > 0 ? currentPage : 0}/{totalPage}
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
          className='flex justify-between items-center w-44 py-2 border relative text-black'
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
  )
}
