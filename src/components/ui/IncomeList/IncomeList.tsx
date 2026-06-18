import { CashGatheringCard } from '../CashGatheringCard/CashGatheringCard'
import { IIncome } from '../../../api/types'

interface IncomeListProps {
  list: IIncome[]
}
export const IncomeList = ({ list }: IncomeListProps) => {
  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-x-[25px] 
        md:grid-cols-3 md:gap-x-2.5 md:gap-y-6 
        lg:gap-x-10 md:gap-y-8 
        2xl:grid-cols-3 lg:gap-x-[42px]`}
    >
      {list.map((item, order) => (
        <div key={item.income}>
          <CashGatheringCard
            order={order + 1}
            img={item.img}
            title={item.title}
            income={item.income}
            info={item.info}
          />
        </div>
      ))}
    </ul>
  )
}
