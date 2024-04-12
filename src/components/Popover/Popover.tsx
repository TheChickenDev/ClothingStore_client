import { AnimatePresence, motion } from 'framer-motion'

type T = {
  children: React.ReactNode
  isOpened: boolean
  positionX: 'left' | 'right'
  positionY: 'top' | 'bottom'
}

export default function Popover({ children, isOpened, positionX, positionY }: T) {
  return (
    <AnimatePresence>
      {isOpened && (
        <div className={`absolute ${positionY === 'top' ? 'bottom-full' : 'top-full'} ${positionX}-0 z-50`}>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
