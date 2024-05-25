import { faInfo, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { getOrders } from 'src/apis/user.api'
import { cartImg, logoImg } from 'src/assets/images'
import NavigationTree from 'src/components/NavigationTree'
import paths from 'src/constants/paths'
import { Order } from 'src/types/order.type'
import { JWTPayload } from 'src/types/utils.type'
import { getAccessTokenFromLocalStorage } from 'src/utils/auth'
import { formatCurrency } from 'src/utils/utils'

function OrderDetailPopup({
  order,
  setOrderDetails
}: {
  order: Order | null
  setOrderDetails: React.Dispatch<React.SetStateAction<Order | null>>
}) {
  const handleHidePopup = () => {
    setOrderDetails(null)
  }
  return (
    !!order && (
      <div className='fixed top-0 right-0 left-0 bottom-0 bg-black-layer/30 z-50'>
        <div className='relative bg-white sm:w-3/4 w-4/5 mx-auto mt-24 p-4 rounded-md max-h-[500px] overflow-auto'>
          <button
            onClick={handleHidePopup}
            className='absolute top-4 right-4 text-4xl w-12 h-12 border rounded-full hover:text-pink-primary duration-300'
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className='w-24 m-auto'>
            <img src={logoImg.logo} alt='logo' />
          </div>
          <p className='m-auto w-fit text-xl font-semibold'>Thông tin đơn hàng</p>
          <div className='flex flex-wrap justify-start items-center mt-2'>
            <p className='text-nowrap font-semibold'>Mã đơn hàng:&nbsp;</p>
            <span className='text-red-500'>{order._id}</span>
          </div>
          <div className='flex flex-wrap justify-start items-center mt-2'>
            <p className='text-nowrap font-semibold'>Ngày đặt hàng:&nbsp;</p>
            <span className='text-red-500'>{new Date(order.orderDate).toLocaleDateString('vi-VN')}</span>
          </div>
          <div className='flex flex-wrap justify-start items-center mt-2'>
            <p className='text-nowrap font-semibold'>Ngày nhận hàng:&nbsp;</p>
            <span className='text-red-500'>{new Date(order.deliveryDate).toLocaleDateString('vi-VN')}</span>
          </div>
          <div className='flex flex-wrap justify-start items-center mt-2'>
            <p className='text-nowrap font-semibold'>Trạng thái:&nbsp;</p>
            <span className='text-red-500'>{order.isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành'}</span>
          </div>
          <div className='flex flex-wrap justify-start items-center mt-2'>
            <p className='text-nowrap font-semibold'>Ghi chú:&nbsp;</p>
            <span className='text-red-500'>{order.note}</span>
          </div>
          <div className='overflow-x-auto mt-2'>
            <table className='table-auto w-full'>
              <thead>
                <tr>
                  <th className='border px-4 py-2'>Sản phẩm</th>
                  <th className='border px-4 py-2'>Kích cỡ</th>
                  <th className='border px-4 py-2'>Số lượng</th>
                  <th className='border px-4 py-2'>Giá</th>
                </tr>
              </thead>
              <tbody>
                {order?.products?.map((product, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    <td className='text-center border px-4 py-2'>{product.name}</td>
                    <td className='text-center border px-4 py-2'>{product.size}</td>
                    <td className='text-center border px-4 py-2'>{product.quantity}</td>
                    <td className='text-center border px-4 py-2'>{formatCurrency(product.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='flex flex-wrap justify-start items-center mt-2'>
            <p className='text-nowrap font-semibold'>Giá trị sản phẩm:&nbsp;</p>
            <span className='text-red-500'>{formatCurrency(order.price)}</span>
          </div>
          <div className='flex flex-wrap justify-start items-center mt-2'>
            <p className='text-nowrap font-semibold'>Phí giao hàng:&nbsp;</p>
            <span className='text-red-500'>{formatCurrency(order.shippingFee)}</span>
          </div>
          <div className='flex flex-wrap justify-start items-center mt-2'>
            <p className='text-nowrap font-semibold'>Tổng giá trị đơn hàng:&nbsp;</p>
            <span className='text-red-500'>{formatCurrency(order.totalAmount)}</span>
          </div>
        </div>
      </div>
    )
  )
}

export default function Orders() {
  const { id } = jwtDecode<JWTPayload>(getAccessTokenFromLocalStorage())
  const { isLoading, data } = useQuery({
    queryKey: ['orders', id],
    queryFn: () => getOrders(id)
  })

  const [orderDetails, setOrderDetails] = useState<Order | null>(null)

  const handleChangeOrderDetails = (order: Order) => {
    if (orderDetails) {
      setOrderDetails(null)
    } else {
      setOrderDetails(order)
    }
  }

  return (
    <div className='pt-28 pb-12 lg:px-32 px-4 md:px-16'>
      <NavigationTree
        tree={[
          { name: 'Trang chủ', path: paths.home },
          { name: 'Đơn hàng của tôi', path: paths.orders }
        ]}
        currentPath={paths.orders}
      />
      {isLoading ? (
        <div className='col-span-1 sm:col-span-2 lg:col-span-4 min-h-96 flex justify-center items-center'>
          <div className='loader'></div>
        </div>
      ) : (
        <div>
          {data?.data.data.length === 0 ? (
            <div className='flex justify-center items-center'>
              <img src={cartImg.emptyOrderList} width='500px' height='380px' alt='emptyOrderList' />
            </div>
          ) : (
            data?.data.data.map((order, index) => {
              return (
                <div key={index} className='sm:flex sm:items-center mt-4'>
                  <div className='flex-1 sm:text-base text-sm'>
                    <div className='flex justify-start items-center'>
                      <p className='text-nowrap font-semibold'>Mã đơn hàng:&nbsp;</p>
                      <span className='text-red-500'>{order._id}</span>
                    </div>
                    <div className='flex justify-start items-center'>
                      <p className='text-nowrap font-semibold'>Ngày đặt hàng:&nbsp;</p>
                      <span className='text-red-500'>{new Date(order.orderDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className='flex justify-start items-center'>
                      <p className='text-nowrap font-semibold'>Ngày nhận hàng:&nbsp;</p>
                      <span className='text-red-500'>{new Date(order.deliveryDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className='flex justify-start items-center'>
                      <p className='text-nowrap font-semibold'>Trạng thái:&nbsp;</p>
                      <span className='text-red-500'>{order.isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành'}</span>
                    </div>
                    <div className='flex justify-start items-center'>
                      <p className='text-nowrap font-semibold'>Tổng giá trị đơn hàng:&nbsp;</p>
                      <span className='text-red-500'>{formatCurrency(order.totalAmount)}</span>
                    </div>
                  </div>
                  <div className='text-end sm:mt-0 -mt-14'>
                    <button
                      onClick={() => handleChangeOrderDetails(order)}
                      className='text-3xl px-5 py-2 border rounded-full hover:text-pink-primary duration-300'
                    >
                      <FontAwesomeIcon icon={faInfo} />
                    </button>
                  </div>
                  <OrderDetailPopup order={orderDetails} setOrderDetails={setOrderDetails} />
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
