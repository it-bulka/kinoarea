import { IVideo } from '../../../../api/types'

type VideoSlideProps = Omit<IVideo, 'id'>

export const VideoSlide = ({ src, title }: VideoSlideProps) => (
  <div>
    <img
      src={src}
      alt={title}
      className={`w-full object-cover aspect-[184/132] md:aspect-[163/116] lg:aspect-[210/160] 2xl:aspect-[2344/247]`}
    />
    <p className={'text-xs font-black mb-1 lg:text-sm 2xl:text-xl 2xl:mb-2'}>{title}</p>
  </div>
)
