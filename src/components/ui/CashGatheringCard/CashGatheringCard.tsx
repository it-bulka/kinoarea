import { IIncome } from '../../../api/types'
interface CashGatheringCardProps extends Omit<IIncome, 'id'> {
  order: number
}
export const CashGatheringCard = ({ img, title, income, info, order }: CashGatheringCardProps) => {
  return (
    <div className={'font-inter font-medium flex items-center max-w-full'}>
      <img src={img} alt={title} className={'rounded-[5px] w-2/5 shrink-1 object-cover'} />
      <div className={'w-3/5 pl-2.5 lg:pl-[11.51px]'}>
        <h6 className={'text-15 font-inter font-bold lg:text-lg/20px'}>
          {order}. {title}
        </h6>
        <p className={'text-gold-light text-13 mt-3 mb-1 lg:text-15 lg:mt-2'}>${income} млн</p>
        <p className={'text-text-base/41 text-xs/12px lg:text-sm/14px 2xl:mt-3'}>{info}</p>
      </div>
    </div>
  )
}
