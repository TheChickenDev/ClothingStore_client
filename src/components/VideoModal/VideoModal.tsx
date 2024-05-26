import { AnimatePresence, motion } from 'framer-motion'
import ReactPlayer from 'react-player/youtube'

export default function VideoModal(props: { isOpen: boolean; toggleOpen: () => void; youtubeVideoUrl: string }) {
  return (
    <AnimatePresence>
      {props.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 bg-black-layer flex justify-center items-center'
          onClick={props.toggleOpen}
        >
          <motion.div
            initial={{ opacity: 0, y: '100vh' }}
            animate={{ opacity: 1, y: ['100vh', 0] }}
            transition={{ delay: 0.2, duration: 0.5, type: 'tween' }}
            className='w-2/3 aspect-video'
          >
            <ReactPlayer
              url={props.youtubeVideoUrl}
              playing={props.isOpen}
              config={{
                playerVars: { disablePictureInPicture: 1 }
              }}
              onEnded={props.toggleOpen}
              width='100%'
              height='100%'
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
