import { Modal, ModalProps } from '../Modal/Modal'
import cls from './MovieModal.module.scss'

type MovieModalProps = Omit<ModalProps, 'children'> & {
  videoKey: string | null
}

export const MovieModal = ({ close, isOpened, videoKey }: MovieModalProps) => {
  return (
    <Modal close={close} isOpened={isOpened} className={cls.modal} contentClassName={cls.modalContent} size={'max'}>
      {videoKey ? (
        <iframe
          title="trailer"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={cls.youtubeFrame}
        />
      ) : (
        <div className={`${cls.youtubeFrame} flex items-center justify-center text-white/60 text-sm`}>
          Трейлер недоступний
        </div>
      )}
    </Modal>
  )
}
