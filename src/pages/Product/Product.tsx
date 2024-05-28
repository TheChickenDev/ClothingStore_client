import { faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { jwtDecode } from 'jwt-decode'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProduct } from 'src/apis/product.api'
import { addToCart } from 'src/apis/user.api'
import NavigationTree from 'src/components/NavigationTree'
import paths from 'src/constants/paths'
import { AppContext } from 'src/contexts/app.context'
import { CartItem } from 'src/types/product.type'
import { JWTPayload } from 'src/types/utils.type'
import { getAccessTokenFromLocalStorage, saveCartToLocalStorage } from 'src/utils/auth'
import { formatCurrency } from 'src/utils/utils'

export default function Product() {
  const { id } = useParams<{ id: string }>()
  const { isLoading, data } = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id)
  })
  const { setCart, darkTheme } = useContext(AppContext)
  const imgRef = useRef<HTMLImageElement>(null)

  const [quantity, setQuantity] = useState<number>(1)
  const [size, setSize] = useState<string>('')
  const [imgIndex, setImgIndex] = useState<number>(0)
  const [currentImage, setCurrentImage] = useState<string>('')

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
    const token = getAccessTokenFromLocalStorage()
    if (!token) {
      toast.info('Vui lòng đăng nhập để thực hiện chức năng này!')
      return
    }
    if (!size) {
      toast.error('Vui lòng chọn size!')
      return
    }
    const product = data?.data.data
    const body: CartItem = {
      productId: String(product?._id),
      name: String(product?.name),
      img: String(product?.img),
      size: size,
      quantity: quantity,
      price: Number(product?.price)
    }

    const decodedToken: JWTPayload = jwtDecode(token)
    loginMutation.mutate(
      { id: decodedToken.id, body },
      {
        onSuccess: (response) => {
          const status = response.data.status
          const cart = response.data.data
          if (status === 'OK') {
            navigate({
              pathname: paths.shop,
              search: '?page=1'
            })
            setCart(cart)
            saveCartToLocalStorage(cart)
            toast.success(response.data.message)
          } else toast.error(response.data.message)
        },
        onError: (error) => {
          toast.error(error.message)
        }
      }
    )
  }

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(e.target.value)
  }

  const handleMouseMoveImgContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = imgRef?.current
    if (img) {
      const rect = img.getBoundingClientRect()
      const offsetX = (e.pageX - (rect.x + window.screenX)) / 10
      const offsetY = (e.pageY - (rect.x + window.screenY)) / 10
      img.style.transitionDuration = '0ms'
      img.style.transform = `scale(1.5) translate(${offsetX}px, ${offsetY}px)`
    }
  }

  const handleMouseLeaveImgContainer = () => {
    const img = imgRef?.current
    if (img) {
      img.style.transform = 'scale(1) translate(0px, 0px)'
      img.style.transitionDuration = '300ms'
    }
  }

  const handleChangeThumbnail = (index: number, image: string) => {
    const imgTag = imgRef.current
    if (imgTag) {
      imgTag.style.transform = 'scale(0.75)'
      imgTag.style.opacity = '0'
      setTimeout(() => {
        setCurrentImage(image)
        setImgIndex(index)
        imgTag.style.transform = ''
        imgTag.style.opacity = ''
      }, 500)
    }
  }

  useEffect(() => {
    setCurrentImage(data?.data.data.img ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className={classNames('py-28 lg:px-32 md:px-8 px-4', { 'bg-black-theme text-white': darkTheme })}>
      {isLoading ? (
        <div className='col-span-1 sm:col-span-2 lg:col-span-4 min-h-96 flex justify-center items-center'>
          <div className='loader'></div>
        </div>
      ) : (
        <>
          <NavigationTree
            tree={[
              { name: 'Trang chủ', path: paths.home },
              { name: 'Của hàng', path: '/shop?page=1' },
              { name: String(data?.data.data.name.toString()), path: `product/${id}` }
            ]}
            currentPath={`product/${id}`}
          />
          <div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              <div>
                <div className='col-span-1 lg:col-span-1 overflow-hidden'>
                  <img
                    ref={imgRef}
                    onMouseMove={handleMouseMoveImgContainer}
                    onMouseLeave={handleMouseLeaveImgContainer}
                    src={currentImage}
                    alt={data?.data.data.name}
                    className='block w-full cursor-zoom-in duration-300'
                  />
                </div>
                <div className='flex justify-start items-center gap-2 mt-2'>
                  {[
                    { url: data?.data.data.img, path: data?.data.data.imgPath },
                    ...(data?.data.data.thumbnail ?? [])
                  ].map((img, index) => (
                    <button key={index} onClick={() => handleChangeThumbnail(index, img.url ?? '')}>
                      <img
                        src={img.url}
                        alt={data?.data.data.name}
                        className={classNames('w-20 h-20 cursor-pointer', {
                          'border border-pink-primary': index === imgIndex
                        })}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className='col-span-1 lg:col-span-1'>
                <h1 className='text-4xl font-semibold'>{data?.data.data.name}</h1>
                <h1 className='text-sm text-gray-400 mt-4'>
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
                <div className='flex justify-start items-center gap-6 mt-8'>
                  <div className='py-2'>
                    <input type='radio' value={'S'} id='size-one' name='price' onChange={handleSizeChange} />
                    <label htmlFor='size-one' className='hover:text-pink-primary cursor-pointer'>
                      S
                    </label>
                  </div>
                  <div className='py-2'>
                    <input type='radio' value={'M'} id='size-two' name='price' onChange={handleSizeChange} />
                    <label htmlFor='size-two' className='hover:text-pink-primary cursor-pointer'>
                      M
                    </label>
                  </div>
                  <div className='py-2'>
                    <input type='radio' value={'L'} id='size-three' name='price' onChange={handleSizeChange} />
                    <label htmlFor='size-three' className='hover:text-pink-primary cursor-pointer'>
                      L
                    </label>
                  </div>
                  <div className='py-2'>
                    <input type='radio' value={'XL'} id='size-four' name='price' onChange={handleSizeChange} />
                    <label htmlFor='size-four' className='hover:text-pink-primary cursor-pointer'>
                      XL
                    </label>
                  </div>
                </div>
                <div className='flex justify-start items-center text-base font-semibold border w-fit mt-2'>
                  <button onClick={decreaseQuantity} className='w-12 h-10 hover:text-pink-primary duration-300'>
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className='w-12 border-l border-r text-center'>{quantity}</span>
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
