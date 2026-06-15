import { useCallback, useState } from 'react'
import { flushSync } from 'react-dom'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ICategories } from '../../../api/types/categories'
import { CategoriesTypes } from '../../../mock/categories'

const slugs: CategoriesTypes[] = ['genres', 'category', 'cast', 'year', 'tv']

export const useCollectionNavigation = () => {
  const [chosenCollection, setChosenCollection] = useState<ICategories | null>()
  const { slug } = useParams<Record<'slug', CategoriesTypes>>()
  const navigate = useNavigate()
  const location = useLocation()

  const onCategoryClick = useCallback(
    (category: ICategories) => {
      flushSync(() => setChosenCollection(category))
      navigate(category.types)
    },
    [navigate]
  )

  const isValidSlug = !!slug && slugs.includes(slug)

  return { chosenCollection, slug, location, onCategoryClick, isValidSlug }
}
