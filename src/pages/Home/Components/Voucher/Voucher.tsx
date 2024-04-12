import { voucherImg } from 'src/assets/images'
import VoucherItem from './Components/VoucherItem'

export default function Voucher() {
  return (
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
        code='AUGUST24'
      />
      <VoucherItem
        image={voucherImg.summerVoucher}
        name='Phiếu quà tặng mùa hè'
        percent={30}
        expiredAt={'2024-07-24'}
        condition='This coupon code will apply on Grocery type products and when you shopping more than $500'
        code='AUGUST24'
      />
      <VoucherItem
        image={voucherImg.januaryVoucher}
        name='Phiếu quà tặng tháng giêng'
        percent={35}
        expiredAt={'2024-03-21'}
        condition='This coupon code will apply on Grocery type products and when you shopping more than $500'
        code='AUGUST24'
      />
    </div>
  )
}
