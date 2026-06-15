import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHero } from '../../components/ui/PageHero/PageHero'
import { NewsTabBar } from './NewsTabBar'
import { NewsFilmList, NewsTab } from './NewsFilmList'

export const News = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<NewsTab>('upcoming')

  const onTabChange = useCallback((tab: NewsTab) => setActiveTab(tab), [])

  return (
    <section className="container pb-8 md:pb-10 lg:pb-9 2xl:pb-[71px]">
      <PageHero title={t('news.title')} />
      <NewsTabBar activeTab={activeTab} onTabChange={onTabChange} />
      <NewsFilmList activeTab={activeTab} />
    </section>
  )
}
