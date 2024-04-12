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
  const [expiredAtAbout, setExpiredAtAbout] = useState<{
    diffDays: number
    diffHours: number
    diffMinutes: number
    diffSeconds: number
  }>({ diffDays: 0, diffHours: 0, diffMinutes: 0, diffSeconds: 0 })
  const [conditionPopup, setConditionPopup] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const { diffDays, diffHours, diffMinutes, diffSeconds } = calculateDifferenceBetweenNowAndFutureDate(expiredAt)
      setExpiredAtAbout({ diffDays, diffHours, diffMinutes, diffSeconds })
    }, 1000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiredAtAbout])

  const handleMouseEnterConditionBlock = () => {
    setConditionPopup(true)
  }

  const handleMouseLeaveConditionBlock = () => {
    setConditionPopup(false)
  }

  return (
    <div className='sm:flex sm:justify-between sm:items-center gap-2 p-4 border-2 border-grayBorder relative'>
      <div className='flex justify-start items-center w-3/4'>
        <div className='w-32 h-32 mr-4'>
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
              <p>{expiredAtAbout.diffDays}</p>
              <p>DAY</p>
            </div>
            <div className='h-4 border-l border-gray-300' />
            <div className=''>
              <p>{expiredAtAbout.diffHours}</p>
              <p>HRS</p>
            </div>
            <div className='h-4 border-l border-gray-300' />
            <div className=''>
              <p>{expiredAtAbout.diffMinutes}</p>
              <p>MIN</p>
            </div>
            <div className='h-4 border-l border-gray-300' />
            <div className=''>
              <p>{expiredAtAbout.diffSeconds}</p>
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
            Coupon <span className='text-greenPrimary'>Active</span>
          </p>
          <Popover isOpened={conditionPopup} positionX='right' positionY='top'>
            <div className='min-w-80 bg-white rounded-md shadow-lg p-4'>{'*' + condition}</div>
          </Popover>
        </div>
        <button className='p-4 border-dashed border-2 border-greenBold text-greenBold bg-greenBold/10'>{code}</button>
      </div>
      <span className='voucherItem_border'></span>
    </div>
  )
}
