import { useEffect, useState } from 'react'
import Popover from 'src/components/Popover'
import { calculateDifferenceBetweenNowAndFutureDate } from 'src/utils/utils'

type VoucherItemProps = {
  image: string
  name: string
  percent: number
  expiredAt: string
  condition: string
  code: string
}

export default function VoucherItem({ image, name, percent, expiredAt, condition, code }: VoucherItemProps) {
  const [expiredTime, setExpiredAtAbout] = useState<{
    diffDays: number
    diffHours: number
    diffMinutes: number
    diffSeconds: number
    isExpired: boolean
  }>({ diffDays: 0, diffHours: 0, diffMinutes: 0, diffSeconds: 0, isExpired: false })
  const [conditionPopup, setConditionPopup] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const { diffDays, diffHours, diffMinutes, diffSeconds, isExpired } =
        calculateDifferenceBetweenNowAndFutureDate(expiredAt)
      setExpiredAtAbout({ diffDays, diffHours, diffMinutes, diffSeconds, isExpired })
    }, 1000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiredTime])

  const handleMouseEnterConditionBlock = () => {
    setConditionPopup(true)
  }

  const handleMouseLeaveConditionBlock = () => {
    setConditionPopup(false)
  }

  const handleCopyCouponClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    navigator.clipboard.writeText(code)
    const element = e.currentTarget
    element.innerText = 'Copied!'
    const timer = setTimeout(() => {
      element.innerText = code
    }, 3000)
    return () => clearTimeout(timer)
  }

  return (
    <div className='sm:flex sm:justify-between sm:items-center gap-2 p-4 border-2 border-gray-border bg-white relative'>
      <div className='flex sm:justify-start justify-center items-center w-3/4'>
        <div className='sm:block hidden w-32 h-32 mr-4'>
          <img src={image} alt={name} className='block w-full h-full' />
        </div>
        <div>
          <p className='text-base font-bold'>{name}</p>
          <p className='text-lg font-bold mt-1 mb-4'>
            <span className='text-red-500'>{percent + '%'}</span>
            &nbsp;Off
          </p>
          <div className='flex justify-start items-center gap-4 text-xs'>
            <div className=''>
              <p>{expiredTime.diffDays}</p>
              <p>DAY</p>
            </div>
            <div className='h-4 border-l border-gray-300' />
            <div className=''>
              <p>{expiredTime.diffHours}</p>
              <p>HRS</p>
            </div>
            <div className='h-4 border-l border-gray-300' />
            <div className=''>
              <p>{expiredTime.diffMinutes}</p>
              <p>MIN</p>
            </div>
            <div className='h-4 border-l border-gray-300' />
            <div className=''>
              <p>{expiredTime.diffSeconds}</p>
              <p>SEC</p>
            </div>
          </div>
        </div>
      </div>
      <div className='sm:w-1/4 w-3/4 text-center'>
        <div
          className='relative p-2 mb-2'
          onMouseEnter={handleMouseEnterConditionBlock}
          onMouseLeave={handleMouseLeaveConditionBlock}
        >
          <p>
            Coupon{' '}
            <span className={`${expiredTime.isExpired ? 'text-red-500' : 'text-green-primary'}`}>
              {expiredTime.isExpired ? 'Inactive' : 'Active'}
            </span>
          </p>
          <Popover isOpened={conditionPopup} positionX='right' positionY='top'>
            <div className='min-w-80 bg-white rounded-md shadow-lg p-4'>{'*' + condition}</div>
          </Popover>
        </div>
        <button
          className='p-4 border-dashed border-2 border-green-bold text-green-bold bg-green-bold/10 hover:opacity-70'
          onClick={(e) => handleCopyCouponClick(e)}
          disabled={expiredTime.isExpired}
        >
          {code}
        </button>
      </div>
      <span className='voucher-item-border'></span>
    </div>
  )
}
