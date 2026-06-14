import { useEffect, useMemo, useState } from 'react'
import { Typography, TypographyTypes } from '../../components/ui/Typography/Typography'
import { Breadcrumbs } from '../../components/ui/Breadcrumbs/Breadcrumbs'
import { NewsItem } from '../../components/ui/NewsItem/NewsItem'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import { FirebaseApi } from '../../api/firebase'
import { INews } from '../../api/types'
import cls from './News.module.scss'
import { NewsSkeleton } from './NewsSkeleton'

const PAGE_SIZE = 10

export const News = () => {
  const [allNews, setAllNews] = useState<INews[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    FirebaseApi.getNews().then(news => {
      setAllNews(news)
      setIsLoading(false)
    })
  }, [])

  const pageNews = useMemo(
    () => allNews.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [allNews, currentPage]
  )

  if (isLoading) return <NewsSkeleton />

  return (
    <section className={'container pt-6 pb-8 md:pb-10 lg:pb-9 2xl:pb-[71px]'}>
      <Typography variant={'h1'} type={TypographyTypes._TITLE} className={'text-center md:text-start'}>
        Новости
      </Typography>
      <Breadcrumbs className={'mx-auto md:ml-0'} />

      <div
        className={`
            grid grid-cols-1 gap-1.5 mt-6
            sm:gap-2.5
            md:grid-cols-2 md:gap-x-[23.83px] md:gap-y-[18.3px] md:mt-3.5
            lg:grid-cols-3 lg:gap-x-5 lg:gap-y-[20.6px] lg:mt-6
            2xl:gap-x-[33px] 2xl:gap-y-[30px] 2xl:mt-12
            ${cls.newsList}`}
      >
        {pageNews.map(item => (
          <NewsItem {...item} key={item.id} />
        ))}
      </div>

      {allNews.length > PAGE_SIZE && (
        <Pagination
          totalCount={allNews.length}
          currentPage={currentPage}
          siblingCount={2}
          pageSize={PAGE_SIZE}
          onPageChange={(page: number) => setCurrentPage(page)}
          className={'mx-auto mt-5 sm:mt-[30.59px] md:mt-10 lg:mt-[58.60px]  2xl:mt-[71px]'}
        />
      )}
    </section>
  )
}
