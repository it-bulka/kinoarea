import { useEffect } from 'react'
import { SectionHeader } from '../../../../components/ui/SectionHeader/SectionHeader'
import { IncomeList } from '../../../../components/ui/IncomeList/IncomeList'
import { profit } from '../../../../mock/categories'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { setActiveItem } from '../../../../utils/setActiveItem'
import { useActions } from '../../../../hooks/useActions'
import { ICategory } from '../../../../components/ui/Category/Category'

export const Profit = () => {
  const { activeCategory, items } = useTypedSelector(state => state.profit)
  const { changeProfitActiveCategory, fetchProfitMovies } = useActions()

  useEffect(() => {
    fetchProfitMovies()
  }, [])

  const onCategoryChange = (item: ICategory) => {
    changeProfitActiveCategory(item)
  }

  return (
    <section className={'container'}>
      <SectionHeader
        title={'Кассовые сборы'}
        categories={setActiveItem(profit, activeCategory.id)}
        onCategoryClick={onCategoryChange}
      />
      <IncomeList list={items} />
    </section>
  )
}
