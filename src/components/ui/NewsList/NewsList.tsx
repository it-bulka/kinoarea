import { useCallback, useEffect, useState } from 'react'
import { NewsMiniCard } from '../NewsMiniCard/NewsMiniCard'
import { NewsBigCard } from '../NewsBigCard/NewsBigCard'
import { getScreenWidth, screens } from '../../../utils'
import { INews } from '../../../api/types'
import { FirebaseApi } from '../../../api/firebase'

const getResponsiveCount = (): number => {
  const screen = getScreenWidth()
  if (screen >= screens.lg) return 4
  if (screen >= screens.md) return 3
  return 2
}

interface NewsListProps {
  className?: string
}

export const NewsList = ({ className }: NewsListProps) => {
  const [allNews, setAllNews] = useState<INews[]>([])
  const [count, setCount] = useState(getResponsiveCount)

  useEffect(() => {
    FirebaseApi.getNews(5).then(setAllNews)
  }, [])

  const updateCount = useCallback(() => setCount(getResponsiveCount()), [])

  useEffect(() => {
    window.addEventListener('resize', updateCount)
    return () => window.removeEventListener('resize', updateCount)
  }, [updateCount])

  if (!allNews.length) return null

  const [first, ...rest] = allNews
  const cards = rest.slice(0, count)

  return (
    <div className={'2xl:flex 2xl:gap-3.5'}>
      <NewsBigCard {...first} className={'aspect-[1159/870]'} />
      <ul
        className={`${className} grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 mt-2.5 2xl:grid-cols-1 2xl:min-w-[256px]`}
      >
        {cards.map(item => (
          <NewsMiniCard {...item} key={item.id} />
        ))}
      </ul>
    </div>
  )
}
