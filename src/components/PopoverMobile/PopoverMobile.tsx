import { AnimatePresence, motion } from 'framer-motion'

type T = {
  children: React.ReactNode
  isOpened: boolean
}

export default function PopoverMobile({ children, isOpened }: T) {
  return (
    <AnimatePresence>
      {isOpened && (
        <div className='fixed top-0 right-0 bottom-0 left-0 bg-black/80 z-50'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className='mx-auto mt-40 min-w-48 max-w-72 bg-white shadow-md rounded-md overflow-hidden'
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
