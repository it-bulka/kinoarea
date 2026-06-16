import { ReactComponent as ArrowLeft } from '../../../../assets/images/general/arrow-nav-left.svg'
import { ReactComponent as ArrowRight } from '../../../../assets/images/general/arrow-nav-right.svg'

interface SliderNavProps {
  sliderName: string
  className?: string
}
export const SliderNav = ({ sliderName, className }: SliderNavProps) => {
  return (
    <div className={`inline-flex ${className}`}>
      <button className={`${sliderName}-prev`}>
        <ArrowLeft />
      </button>
      <p className={`${sliderName}-pagination pl-5 pr-4 font-inter font-medium text-base 2xl:text-xl`}></p>
      <button className={`${sliderName}-next`}>
        <ArrowRight />
      </button>
    </div>
  )
}
