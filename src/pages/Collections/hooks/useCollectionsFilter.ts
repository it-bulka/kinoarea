import { useCallback, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'
import { categories_2 } from '../../../mock/categories'
import { scrollTop } from '../../../utils/scrollTop'
import { usePageParam } from '../../../hooks/usePageParam'
import { CategoryTag } from '../CollectionsTagButton'

export const PAGE_SIZE = 12

export const useCollectionsFilter = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = usePageParam()
  const [activeCategory, setActiveCategory] = useState<CategoryTag | null>(null)

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

  const effectiveCategory = activeCategory ?? categoriesTags[0]

  const list = useMemo(() => {
    const data = categories_2.filter(item => item.types.includes(effectiveCategory.type))
    return data.length ? data : categories_2
  }, [effectiveCategory])

  const listPerPage = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return list.slice(start, start + PAGE_SIZE)
  }, [list, currentPage])

  const changePage = useCallback(
    (pageNum: number) => {
      setCurrentPage(pageNum)
      scrollTop()
    },
    [setCurrentPage]
  )

  const onCategoryTagClick = useCallback(
    (tag: CategoryTag) => {
      setActiveCategory(tag)
      setCurrentPage(1)
      const btn = document.querySelector<HTMLElement>(`[data-tag="${tag.id}"]`)
      if (btn) gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.35, ease: 'back.out(1.7)' })
    },
    [setCurrentPage]
  )

  return { categoriesTags, effectiveCategory, list, listPerPage, currentPage, changePage, onCategoryTagClick }
}
