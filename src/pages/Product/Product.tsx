import { faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProduct } from 'src/apis/product.api'
import { addToCart } from 'src/apis/user.api'
import NavigationTree from 'src/components/NavigationTree'
import paths from 'src/constants/paths'
import { CartItem } from 'src/types/product.type'
import { getAccessTokenFromLocalStorage } from 'src/utils/auth'
import { formatCurrency } from 'src/utils/utils'

export default function Product() {
  const { id } = useParams<{ id: string }>()
  const { isLoading, data } = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id)
  })

  const [quantity, setQuantity] = useState<number>(1)

  const navigate = useNavigate()

  const increaseQuantity = () => {
    if (quantity < 99) {
      setQuantity((prevQuantity) => prevQuantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1)
    }
  }

  const loginMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: CartItem }) => addToCart(id, body)
  })

  const handleAddToCart = async () => {
    const product = data?.data.data
    const body: CartItem = {
      productId: String(product?._id),
      name: String(product?.name),
      img: String(product?.img),
      size: 'L',
      quantity: quantity,
      price: Number(product?.price)
    }

    const decodedToken: { id: string; isAdmin: string; iat: string; exp: string } = jwtDecode(
      getAccessTokenFromLocalStorage()
    )

    loginMutation.mutate(
      { id: decodedToken.id, body },
      {
        onSuccess: (response) => {
          const status = response.data.status
          if (status === 'OK') {
            navigate({
              pathname: paths.shop,
              search: '?page=1'
            })
            toast.success(response.data.message)
          } else toast.error(response.data.message)
        },
        onError: (error) => {
          toast.error(error.message)
        }
      }
    )
  }

  return (
    <div className='py-28 lg:px-32 md:px-8 px-4'>
      {isLoading ? (
        <div className='col-span-1 sm:col-span-2 lg:col-span-4 min-h-96 flex justify-center items-center'>
          <div className='loader'></div>
        </div>
      ) : (
        <>
          <NavigationTree
            tree={[
              { name: 'Home', path: '/' },
              { name: 'Products', path: '/shop?page=1' },
              { name: String(data?.data.data.name.toString()), path: `product/${id}` }
            ]}
            currentPath={`product/${id}`}
          />
          <div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              <div className='col-span-1 lg:col-span-1'>
                <img src={data?.data.data.img} alt={data?.data.data.name} className='w-full' />
              </div>
              <div className='col-span-1 lg:col-span-1'>
                <h1 className='text-4xl font-semibold'>{data?.data.data.name}</h1>
                <h1 className='text-sm text-gray-500 mt-4'>
                  Mua sắm tại Hein Shop với giá ưu đãi hàng ngày. Giao hàng miễn phí cho đơn hàng từ 200.000 ₫ trở lên
                  hoặc nhận hàng tại cửa hàng.
                </h1>
                <div className='flex items-center gap-2 mt-8'>
                  <span className='text-gray-400 line-through'>
                    {formatCurrency(Number(data?.data.data.price_before_discount))}
                  </span>
                  <span className='text-xl font-semibold text-pink-primary'>
                    {formatCurrency(Number(data?.data.data.price))}
                  </span>
                </div>
                <div className='flex justify-start items-center text-base font-semibold'>
                  Đánh giá: &nbsp;
                  {Array(5)
                    .fill(0)
                    .map((_, index) => {
                      let width = '0'
                      const minus = data?.data.data.rating ? data?.data.data.rating - index : 0
                      if (minus >= 1) width = '100%'
                      else if (minus > 0 && minus < 1) width = `${minus * 100}%`
                      return (
                        <div key={index} className='relative text-xs'>
                          <div className='text-gray-300'>
                            <FontAwesomeIcon icon={faStar} />
                          </div>
                          <div
                            className='text-yellow-primary absolute top-0 left-0 overflow-hidden'
                            style={{ width: width }}
                          >
                            <FontAwesomeIcon icon={faStar} />
                          </div>
                        </div>
                      )
                    })}
                </div>
                <span className='text-base font-semibold'>Đã bán: {data?.data.data.sold}</span>
                <div className='flex justify-start items-center text-base font-semibold border w-fit mt-8'>
                  <button onClick={decreaseQuantity} className='w-12 h-10 hover:text-pink-primary duration-300'>
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className='w-12 border-l border-r text-center text-gray-700'>{quantity}</span>
                  <button onClick={increaseQuantity} className='w-12 h-10 hover:text-pink-primary duration-300'>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <div className='mt-8'>
                  <button
                    onClick={handleAddToCart}
                    className='block w-40 text-center text-sm text-white px-2 py-4 bg-pink-primary mt-4 sm:mt-0 hover:bg-purple-primary transition-colors duration-300'
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
            <div className='mt-8'>
              <h2 className='text-2xl font-semibold'>Mô tả</h2>
              <p className='mt-2'>{data?.data.data.desc}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
