import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { payment, removeFromCart } from 'src/apis/user.api'
import { cartImg } from 'src/assets/images'
import NavigationTree from 'src/components/NavigationTree'
import paths from 'src/constants/paths'
import { AppContext } from 'src/contexts/app.context'
import { Order } from 'src/types/order.type'
import { clearCart, getAccessTokenFromLocalStorage, getCartItems, saveCartToLocalStorage } from 'src/utils/auth'
import { formatCurrency } from 'src/utils/utils'

export default function Cart() {
  const { cart, setCart } = useContext(AppContext)
  const [decodedToken, setDecodedToken] = useState<{
    id: string
    isAdmin: string
    iat: string
    exp: string
    name: string
    email: string
    phone: string
    address: string
  } | null>(null)
  const [note, setNote] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  const navigate = useNavigate()

  const removeFromCartMutation = useMutation({
    mutationFn: ({ id, productId, size }: { id: string; productId: string; size: string }) =>
      removeFromCart(id, productId, size)
  })

  const handleRemoveFromCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: string,
    size: string
  ) => {
    e.preventDefault()
    e.stopPropagation()

    const userId = decodedToken?.id
    if (!userId) {
      toast.error('Vui lòng đăng nhập để thực hiện chức năng này!')
      return
    }
    removeFromCartMutation.mutate(
      { id: userId, productId, size },
      {
        onSuccess: (response) => {
          const status = response.data.status
          const cart = response.data.data
          if (status === 'OK') {
            toast.success(response.data.message)
            setCart(cart)
            saveCartToLocalStorage(cart)
          } else {
            toast.error(response.data.message)
          }
        },
        onError: (error) => {
          toast.error(error.message)
        }
      }
    )
  }

  const paymentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Order }) => payment(id, data)
  })

  const onSubmit = () => {
    const userId = decodedToken?.id
    if (!userId) {
      toast.error('Vui lòng đăng nhập để thực hiện chức năng này!')
      return
    }
    const orderDate = new Date()
    const deliveryDate = new Date()
    deliveryDate.setDate(orderDate.getDate() + 3)
    const price = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    const data = {
      _id: '',
      name: decodedToken.name,
      phone: decodedToken.phone,
      address: address,
      orderDate,
      deliveryDate,
      price,
      shippingFee: price >= 200000 ? 0 : 30000,
      totalAmount: price >= 200000 ? price : price + 30000,
      note: note
    }
    paymentMutation.mutate(
      { id: decodedToken.id, data },
      {
        onSuccess: (response) => {
          const status = response.data.status
          const message = response.data.message
          if (status === 'OK') {
            toast.success(message)
            navigate({
              pathname: paths.shop,
              search: 'page=1'
            })
            setCart([])
            clearCart()
          } else {
            toast.error(message)
          }
        },
        onError: (error) => {
          toast.error(error.message)
        }
      }
    )
  }

  useEffect(() => {
    setAddress(decodedToken?.address ?? '')
    const temp = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    setPrice(temp)
    setTotal(temp > 200000 ? temp : temp + 30000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedToken, cart])

  useEffect(() => {
    const cart = getCartItems()
    setCart(cart ?? [])
    setDecodedToken(jwtDecode(getAccessTokenFromLocalStorage()))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTextAreaEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode == 13) {
      event.preventDefault()
    }
  }

  return (
    <div className='pt-28 pb-12 lg:px-32 px-4 md:px-16'>
      <NavigationTree
        tree={[
          { name: 'Trang chủ', path: paths.home },
          { name: 'Giỏ hàng của tôi', path: paths.cart }
        ]}
        currentPath={paths.cart}
      />
      {cart.length === 0 ? (
        <div className='m-auto w-fit'>
          <img src={cartImg.emptyCart} alt='emptyCart' />
          <p className='w-full text-4xl text-center p-2'>{'Giỏ hàng trống! :<'}</p>
        </div>
      ) : (
        <>
          <div className='flex flex-col lg:flex-row gap-12'>
            <div className='lg:w-3/4'>
              <div className='mb-2'>
                {cart.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/product/${item.productId}`}
                      className='flex items-center gap-2 p-2 w-full group'
                    >
                      <div className='sm:block hidden w-20 min-w-20 h-24 rounded-xl overflow-hidden border'>
                        <img src={item.img} alt='product' className='block w-full h-full ' />
                      </div>
                      <div className='flex-1'>
                        <p className='lg:text-xl line-clamp-2 group-hover:text-pink-primary duration-300'>
                          {item.name}
                        </p>
                        <p className='text-sm text-gray-400'>{'Size: ' + item.size}</p>
                      </div>
                      <p className='text-xl lg:px-12 px-2'>{item.quantity}</p>
                      <p className='text-xl text-end min-w-32'>{formatCurrency(item.price)}</p>
                      <div>
                        <button
                          className='px-4 py-2 border float-right hover:text-pink-primary duration-200'
                          onClick={(e) => handleRemoveFromCart(e, item.productId, item.size)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <hr />
              <div className='flex justify-between items-center px-2 mt-2'>
                <span className='font-semibold'>Giá trị đơn hàng:</span>
                <span className='text-lg'>{formatCurrency(price)}</span>
              </div>
              <div className='flex justify-between items-center px-2'>
                <span className='font-semibold'>Phí giao hàng:</span>
                <span className='text-lg'>{price >= 200000 ? 'Miễn phí' : '30.000đ'}</span>
              </div>
              <div className='flex justify-between items-center px-2'>
                <span className='text-lg font-bold'>Tổng cộng:</span>
                <span className='text-lg font-bold text-red-500'>{formatCurrency(total)}</span>
              </div>
            </div>
            <div className='lg:w-1/4 border shadow-lg p-2 rounded-[36px]'>
              <input
                className='w-full px-6 py-3 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-pink-primary'
                type='text'
                placeholder='Tên'
                value={decodedToken?.name}
                disabled
              />
              <input
                className='w-full px-6 py-3 mb-3 mt-5 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-pink-primary'
                type='text'
                placeholder='Số điện thoại'
                value={decodedToken?.phone}
                disabled
              />
              <textarea
                className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-pink-primary'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={handleTextAreaEnter}
                placeholder='Địa chỉ'
              />
              <textarea
                className='w-full px-6 py-3 my-2 bg-gray-100 rounded-3xl text-lg outline-none focus:placeholder:text-pink-primary'
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onKeyDown={handleTextAreaEnter}
                placeholder='Ghi chú'
              />
              <button
                onClick={onSubmit}
                className='w-full min-h-14 px-6 py-3 mt-2 bg-pink-primary rounded-3xl text-xl text-white text-center hover:bg-purple-primary duration-300'
                disabled={paymentMutation.isPending}
              >
                {paymentMutation.isPending ? (
                  <div className='w-full flex justify-center items-center'>
                    <div className='loader'></div>
                  </div>
                ) : (
                  'Đặt hàng ngay'
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
