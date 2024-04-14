import { motion, useAnimation, useInView } from 'framer-motion'
import { voucherImg } from 'src/assets/images'
import VoucherItem from './Components/VoucherItem'
import { useEffect, useRef } from 'react'

export default function Voucher() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInview = useInView(scrollRef)
  const scrollControls = useAnimation()

  useEffect(() => {
    if (isInview) {
      scrollControls.start('visible')
    } else {
      scrollControls.start('hidden')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInview])

  return (
    <>
      <div className='grid xl:grid-cols-2 grid-cols-1 gap-4 py-2'>
        <VoucherItem
          image={voucherImg.augustVoucher}
          name='Phiếu quà tặng tháng 8'
          percent={15}
          expiredAt={'2024-09-12'}
          condition='This coupon code will apply on Grocery type products and when you shopping more than $500'
          code='AUGUST24'
        />
        <VoucherItem
          image={voucherImg.winterVoucher}
          name='Phiếu quà tặng mùa giáng sinh'
          percent={12}
          expiredAt={'2024-12-31'}
          condition='This coupon code will apply on Grocery type products and when you shopping more than $500'
          code='WINTER24'
        />
        <VoucherItem
          image={voucherImg.summerVoucher}
          name='Phiếu quà tặng mùa hè'
          percent={30}
          expiredAt={'2024-07-24'}
          condition='This coupon code will apply on Grocery type products and when you shopping more than $500'
          code='SUMMER24'
        />
        <VoucherItem
          image={voucherImg.januaryVoucher}
          name='Phiếu quà tặng tháng giêng'
          percent={35}
          expiredAt={'2024-03-21'}
          condition='This coupon code will apply on Grocery type products and when you shopping more than $500'
          code='JANUARY24'
        />
      </div>
      <div ref={scrollRef}>
        <motion.div
          className='relative my-8'
          variants={{
            hidden: { opacity: 0, y: 200 },
            visible: { opacity: 1, y: 0 }
          }}
          initial='hidden'
          animate={scrollControls}
          transition={{ duration: 0.5, type: 'spring', stiffness: 210 }}
        >
          <img src={voucherImg.premium} alt='Premium' className='block' />
        </motion.div>
      </div>
    </>
  )
}
