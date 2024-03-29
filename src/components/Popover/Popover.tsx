import { AnimatePresence, motion } from 'framer-motion'

type T = {
  children: React.ReactNode
  isOpened: boolean
  position: 'left' | 'right'
}

export default function Popover({ children, isOpened, position }: T) {
  return (
    <AnimatePresence>
      {isOpened && (
        <div className={`absolute top-full ${position}-0 z-50`}>
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
