import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import { gsap } from 'gsap'
import { Button } from '../../components/ui/Button/Button'
import { NewsTab } from './hooks/useNewsFilms'
import cls from './News.module.scss'

interface TabItem {
  id: NewsTab
  title: string
}

interface TabButtonProps {
  tab: TabItem
  isActive: boolean
  onTabChange: (id: NewsTab) => void
}

const TabButton = memo(({ tab, isActive, onTabChange }: TabButtonProps) => {
  const handleClick = useCallback(() => {
    onTabChange(tab.id)
    const btn = document.querySelector<HTMLElement>(`[data-tab="${tab.id}"]`)
    if (btn) gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.35, ease: 'back.out(1.7)' })
  }, [onTabChange, tab.id])

  return (
    <Button
      data-tab={tab.id}
      className={classnames([cls.tagBtn], { [cls.notActive]: !isActive })}
      onClick={handleClick}
    >
      {tab.title}
    </Button>
  )
})

TabButton.displayName = 'TabButton'

interface NewsTabBarProps {
  activeTab: NewsTab
  onTabChange: (tab: NewsTab) => void
}

export const NewsTabBar = ({ activeTab, onTabChange }: NewsTabBarProps) => {
  const { t } = useTranslation()

  const tabs = useMemo<TabItem[]>(
    () => [
      { id: 'upcoming', title: t('news.upcoming') },
      { id: 'trending', title: t('news.trending') },
    ],
    [t]
  )

  return (
    <div className="flex-center flex-wrap gap-2 md:gap-3 mb-6">
      {tabs.map(tab => (
        <TabButton key={tab.id} tab={tab} isActive={tab.id === activeTab} onTabChange={onTabChange} />
      ))}
    </div>
  )
}
