import { Typography, TypographyTypes } from '../../components/ui/Typography/Typography'
import { Breadcrumbs } from '../../components/ui/Breadcrumbs/Breadcrumbs'
import { Button } from '../../components/ui/Button/Button'
import { useCallback, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import cls from './Collections.module.scss'
import classnames from 'classnames'
import { CollectionsList } from '../../components/ui/CollectionsList/CollectionsList'
import { categories_2, CategoriesTypes } from '../../mock/categories'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import { scrollTop } from '../../utils/scrollTop'
import { Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ICategories } from '../../api/types/categories'
import { useTranslation } from 'react-i18next'
import { usePageParam } from '../../hooks/usePageParam'

type CategoryTag = {
  id: string
  title: string
  type: CategoriesTypes | 'all'
}

const pageSize = 5
const slugs: CategoriesTypes[] = ['genres', 'category', 'cast', 'year', 'tv']

export const Collections = () => {
  const { t } = useTranslation()
  const categoriesTags = useMemo<CategoryTag[]>(
    () => [
      { id: '1', title: t('collections.tags.all'), type: 'all' },
      { id: '2', title: t('collections.tags.tv'), type: 'tv' },
      { id: '3', title: t('collections.tags.directions'), type: 'category' },
      { id: '4', title: t('collections.tags.cast'), type: 'cast' },
      { id: '5', title: t('collections.tags.revenue'), type: 'all' },
      { id: '6', title: t('collections.tags.awards'), type: 'all' },
      { id: '7', title: t('collections.tags.years'), type: 'year' },
      { id: '8', title: t('collections.tags.genres'), type: 'genres' },
    ],
    [t]
  )
  const [activeCategory, setActiveCategory] = useState<CategoryTag | null>(null)
  const [currentPage, setCurrentPage] = usePageParam()
  const [chosenCollection, setChosenCollection] = useState<ICategories | null>()
  const { slug } = useParams<Record<'slug', CategoriesTypes>>()
  const navigate = useNavigate()
  const location = useLocation()
  const effectiveCategory = activeCategory ?? categoriesTags[0]

  const list = useMemo(() => {
    const data = categories_2.filter(item => item.types.includes(effectiveCategory.type))

    if (!data.length) return categories_2
    return data
  }, [effectiveCategory])

  const listPerPage = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    const end = currentPage * pageSize

    return list.slice(start, end)
  }, [list, currentPage])

  const changePage = useCallback(
    (pageNum: number) => {
      setCurrentPage(pageNum)
      scrollTop()
    },
    [setCurrentPage]
  )

  const onCategoryTagClick = useCallback(
    (category: CategoryTag) => {
      setActiveCategory(category)
      setCurrentPage(1)
    },
    [setCurrentPage]
  )

  const onCategoryClick = useCallback(
    (category: ICategories) => {
      flushSync(() => setChosenCollection(category))
      navigate(category.types)
    },
    [navigate]
  )

  if (slug && slugs.includes(slug) && chosenCollection) {
    return <Outlet context={{ title: chosenCollection.title, params: chosenCollection.params }} />
  }

  if (slug && location.state) {
    const { title, category } = location.state
    return <Outlet context={{ title, category }} />
  }

  if (slug && !slugs.includes(slug) && !chosenCollection && !location.state) return <Navigate to={'/collections'} />

  return (
    <section className={'container pb-9 lg:pb-10 2xl:pb-[70px]'}>
      <Typography variant={'h1'} type={TypographyTypes._TITLE}>
        {t('collections.title')}
      </Typography>
      <Breadcrumbs />

      <Outlet />
      <Typography className={'mt-2.5 mb-5'}>{t('collections.description')}</Typography>

      <div className={'flex-center flex-wrap'}>
        {categoriesTags.map(category => (
          <Button
            key={category.id}
            className={classnames([cls.btn], { [cls.notActive]: category.id !== effectiveCategory.id })}
            onClick={() => onCategoryTagClick(category)}
          >
            {category.title}
          </Button>
        ))}
      </div>
      <CollectionsList list={listPerPage} onCategoryClick={onCategoryClick} />
      <Pagination
        totalCount={list.length}
        currentPage={currentPage}
        siblingCount={2}
        pageSize={pageSize}
        onPageChange={changePage}
        className={'mx-auto'}
      />
    </section>
  )
}
