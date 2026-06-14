import { useEffect, useState } from 'react'
import { SectionHeader } from '../../../../components/ui/SectionHeader/SectionHeader'
import { IncomeList } from '../../../../components/ui/IncomeList/IncomeList'
import { DateInput } from '../../../../components/ui/DateInput/DateInput'
import { Button } from '../../../../components/ui/Button/Button'
import { profit } from '../../../../mock/categories'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { setActiveItem } from '../../../../utils/setActiveItem'
import { useActions } from '../../../../hooks/useActions'
import { getISODate } from '../../../../utils/getISODate'
import { ICategory } from '../../../../components/ui/Category/Category'

export const Profit = () => {
  const { activeCategory, items } = useTypedSelector(state => state.profit)
  const { changeProfitActiveCategory, fetchProfitMovies } = useActions()

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  useEffect(() => {
    fetchProfitMovies()
  }, [])

  const onCategoryChange = (item: ICategory) => {
    changeProfitActiveCategory(item)
  }

  const onApplyFilter = () => {
    fetchProfitMovies({
      from: startDate ? getISODate(startDate) : undefined,
      to: endDate ? getISODate(endDate) : undefined,
    })
  }

  return (
    <section className={'container'}>
      <SectionHeader
        title={'Кассовые сборы'}
        categories={setActiveItem(profit, activeCategory.id)}
        onCategoryClick={onCategoryChange}
      />
      <div className={'flex flex-wrap items-center gap-3 my-4'}>
        <DateInput
          date={startDate}
          onChange={setStartDate}
          placeholderText={'Від'}
          wrapperClassName={'flex-1 min-w-[120px]'}
        />
        <span className={'text-white/60'}>—</span>
        <DateInput
          date={endDate}
          onChange={setEndDate}
          placeholderText={'До'}
          wrapperClassName={'flex-1 min-w-[120px]'}
        />
        <Button variant={'transparent'} onClick={onApplyFilter}>
          Застосувати
        </Button>
      </div>
      <IncomeList list={items} />
    </section>
  )
}
