import { ReactComponent as CameraIcon } from '../../../assets/images/general/camera.svg'
import { twMerge } from 'tailwind-merge'

interface AbsentImgProps {
  className?: string
  svgClassName?: string
}
export const AbsentImg = ({ className, svgClassName }: AbsentImgProps) => {
  return (
    <div className={twMerge('bg-noir-card flex-center', className)}>
      <CameraIcon className={twMerge('w-[21px] h-[21px] fill-[#404961]', svgClassName)} />
    </div>
  )
}
