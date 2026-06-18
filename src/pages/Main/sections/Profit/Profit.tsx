import { useEffect, useMemo, useState } from 'react'
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
import { ProfitSkeleton } from './ProfitSkeleton'
import { useTranslation } from 'react-i18next'
import { useMainSectionReveal } from '../../hooks/useMainSectionReveal'

const PROFIT_REGIONS: Record<string, string | undefined> = {
  '1': 'UA',
  '2': undefined,
  '3': 'US',
}

export const Profit = () => {
  const { activeCategory, items, isLoading } = useTypedSelector(state => state.profit)
  const { changeProfitActiveCategory, fetchProfitMovies } = useActions()
  const { t } = useTranslation()

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const translatedProfit = useMemo(() => profit.map(p => ({ ...p, title: t(`main.profit.regions.${p.id}`) })), [t])

  const sectionRef = useMainSectionReveal({ deps: [items] })

  useEffect(() => {
    fetchProfitMovies({ region: PROFIT_REGIONS[String(activeCategory.id)] })
  }, [])

  if (isLoading) return <ProfitSkeleton />

  const onCategoryChange = (item: ICategory) => {
    changeProfitActiveCategory(item)
    fetchProfitMovies({ region: PROFIT_REGIONS[String(item.id)] })
  }

  const onApplyFilter = () => {
    fetchProfitMovies({
      region: PROFIT_REGIONS[String(activeCategory.id)],
      from: startDate ? getISODate(startDate) : undefined,
      to: endDate ? getISODate(endDate) : undefined,
    })
  }

  return (
    <section ref={sectionRef} className={'container'}>
      <SectionHeader
        title={t('main.profit.title')}
        categories={setActiveItem(translatedProfit, activeCategory.id)}
        onCategoryClick={onCategoryChange}
      />
      <p className={'text-white/70 text-sm mt-4 mb-2'}>{t('main.profit.periodLabel')}</p>
      <div className={'flex flex-wrap items-center gap-3 mb-4'}>
        <DateInput
          date={startDate}
          onChange={setStartDate}
          placeholderText={t('main.profit.from')}
          wrapperClassName={'flex-1 min-w-[120px]'}
        />
        <span className={'text-white/60'}>—</span>
        <DateInput
          date={endDate}
          onChange={setEndDate}
          placeholderText={t('main.profit.to')}
          wrapperClassName={'flex-1 min-w-[120px]'}
        />
        <Button variant={'transparent'} onClick={onApplyFilter}>
          {t('main.profit.apply')}
        </Button>
      </div>
      {items.length > 0 ? (
        <IncomeList list={items} />
      ) : (
        <p className={'text-white/50 text-center py-8'}>{t('main.profit.empty')}</p>
      )}
    </section>
  )
}
