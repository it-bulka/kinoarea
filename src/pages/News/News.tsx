import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../components/ui/Breadcrumbs/Breadcrumbs'
import { SectionHeader } from '../../components/ui/SectionHeader/SectionHeader'
import { ICategory } from '../../components/ui/Category/Category'
import { setActiveItem } from '../../utils/setActiveItem'
import { NewsFilmList, NewsTab } from './NewsFilmList'

export const News = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<NewsTab>('upcoming')

  const tabs = useMemo<ICategory[]>(
    () => [
      { id: 'upcoming', title: t('news.upcoming') },
      { id: 'trending', title: t('news.trending') },
    ],
    [t]
  )

  const onTabChange = (item: ICategory) => {
    setActiveTab(item.id as NewsTab)
  }

  return (
    <section className={'container pt-6 pb-8 md:pb-10 lg:pb-9 2xl:pb-[71px]'}>
      <Breadcrumbs className={'mx-auto md:ml-0'} />
      <SectionHeader
        title={t('news.title')}
        categories={setActiveItem(tabs, activeTab)}
        onCategoryClick={onTabChange}
      />
      <NewsFilmList activeTab={activeTab} />
    </section>
  )
}
