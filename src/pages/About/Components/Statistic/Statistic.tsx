export default function Statistic() {
  const handleNavigateClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className='grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 sm:px-24 px-4'>
      <div className='group border p-6 hover:border-transparent hover:shadow-lg duration-300'>
        <div className='flex justify-between items-start'>
          <span className='group-hover:-translate-y-4 transition-transform duration-200'>
            <svg width='47' height='42' viewBox='0 0 47 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M5.06035 29.4262L12.5801 37.0285C17.8613 42.3677 19.6652 42.2798 24.8812 37.0285L36.9867 24.79C41.203 20.5275 42.2679 17.6931 36.9867 12.3539L29.467 4.75152C23.838 -0.939241 21.3821 0.488942 17.1659 4.75152L5.06035 16.99C-0.133935 22.2633 -0.568603 23.7354 5.06035 29.4262Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <path
                opacity='0.4'
                d='M38.5975 32.1286L37.1631 34.5236C35.1419 37.9292 36.7067 40.7197 40.6405 40.7197C44.5742 40.7197 46.139 37.9292 44.1178 34.5236L42.6834 32.1286C41.5533 30.239 39.7059 30.239 38.5975 32.1286Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <path
                opacity='0.4'
                d='M1.21484 22.1312C13.2986 18.8134 26.0344 18.7036 38.1616 21.8456L39.2483 22.1312'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </svg>
          </span>
          <button onClick={handleNavigateClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='28px'
              height='28px'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='7' y1='17' x2='17' y2='7' />
              <polyline points='7 7 17 7 17 17' />
            </svg>
          </button>
        </div>
        <div className='mt-12'>
          <p className='text-base text-gray-500'>10k</p>
          <p className='w-fit relative font-heading text-2xl font-semibold after:absolute after:bottom-0 after:left-0 after:border-b-2 after:border-black after:w-0 after:duration-500 hover:after:w-full'>
            Sản phẩm
          </p>
        </div>
      </div>
      <div className='group border p-6 hover:border-transparent hover:shadow-lg duration-300'>
        <div className='flex justify-between items-start'>
          <span className='group-hover:-translate-y-4 transition-transform duration-200'>
            <svg width='32' height='40' viewBox='0 0 32 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M31 10.5V29.5C31 37.1 29.125 39 21.625 39H10.375C2.875 39 1 37.1 1 29.5V10.5C1 2.9 2.875 1 10.375 1H21.625C29.125 1 31 2.9 31 10.5Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <path
                opacity='0.4'
                d='M19.7637 7.65088H12.2637'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <path
                opacity='0.4'
                d='M15.9941 33.4891C17.5992 33.4891 18.9004 32.1706 18.9004 30.5441C18.9004 28.9176 17.5992 27.5991 15.9941 27.5991C14.3891 27.5991 13.0879 28.9176 13.0879 30.5441C13.0879 32.1706 14.3891 33.4891 15.9941 33.4891Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </svg>
          </span>
          <button onClick={handleNavigateClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='28px'
              height='28px'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='7' y1='17' x2='17' y2='7' />
              <polyline points='7 7 17 7 17 17' />
            </svg>
          </button>
        </div>
        <div className='mt-12'>
          <p className='text-base text-gray-500'>5k</p>
          <p className='w-fit relative font-heading text-2xl font-semibold after:absolute after:bottom-0 after:left-0 after:border-b-2 after:border-black after:w-0 after:duration-300 hover:after:w-full'>
            Khách hàng
          </p>
        </div>
      </div>
      <div className='group xl:col-span-1 sm:col-span-2 border p-6 hover:border-transparent hover:shadow-lg duration-300'>
        <div className='flex justify-between items-start'>
          <span className='group-hover:-translate-y-4 transition-transform duration-300'>
            <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                opacity='0.4'
                d='M33.2859 12.4C36.434 12.4 38.9859 9.84803 38.9859 6.7C38.9859 3.55198 36.434 1 33.2859 1C30.1379 1 27.5859 3.55198 27.5859 6.7C27.5859 9.84803 30.1379 12.4 33.2859 12.4Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <path
                opacity='0.4'
                d='M10.5 21.9009H20'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <path
                opacity='0.4'
                d='M10.5 29.5H27.6'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
              <path
                d='M23.8 1H14.3C4.8 1 1 4.8 1 14.3V25.7C1 35.2 4.8 39 14.3 39H25.7C35.2 39 39 35.2 39 25.7V16.2'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </svg>
          </span>
          <button onClick={handleNavigateClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='28px'
              height='28px'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='7' y1='17' x2='17' y2='7' />
              <polyline points='7 7 17 7 17 17' />
            </svg>
          </button>
        </div>
        <div className='mt-12'>
          <p className='text-base text-gray-500'>24h</p>
          <p className='w-fit relative font-heading text-2xl font-semibold after:absolute after:bottom-0 after:left-0 after:border-b-2 after:border-black after:w-0 after:duration-300 hover:after:w-full'>
            Chăm sóc khách hàng
          </p>
        </div>
      </div>
    </section>
  )
}
