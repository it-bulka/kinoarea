import { Navigate, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CollectionsList } from '../../components/ui/CollectionsList/CollectionsList'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import { CollectionsHero } from './CollectionsHero'
import { TagButton } from './CollectionsTagButton'
import { useCollectionsFilter, PAGE_SIZE } from './hooks/useCollectionsFilter'
import { useCollectionNavigation } from './hooks/useCollectionNavigation'
import { usePosterMap } from './hooks/usePosterMap'

export const Collections = () => {
  const { t } = useTranslation()
  const { categoriesTags, effectiveCategory, list, listPerPage, currentPage, changePage, onCategoryTagClick } =
    useCollectionsFilter()
  const { chosenCollection, slug, location, onCategoryClick, isValidSlug } = useCollectionNavigation()
  const posterMap = usePosterMap(listPerPage)

  if (slug && isValidSlug && chosenCollection) {
    return (
      <Outlet
        context={{
          title: t(chosenCollection.title),
          params: chosenCollection.params,
          category: chosenCollection.category,
        }}
      />
    )
  }

  if (slug && location.state) {
    const { title, category } = location.state
    return <Outlet context={{ title, category }} />
  }

  if (slug && !isValidSlug && !chosenCollection && !location.state) return <Navigate to="/collections" />

  return (
    <section className="container pb-9 lg:pb-10 2xl:pb-[70px]">
      <CollectionsHero title={t('collections.title')} description={t('collections.description')} />

      <Outlet />

      <div className="flex-center flex-wrap gap-2 md:gap-3 mb-6">
        {categoriesTags.map(tag => (
          <TagButton
            key={tag.id}
            tag={tag}
            isActive={tag.id === effectiveCategory.id}
            onTagClick={onCategoryTagClick}
          />
        ))}
      </div>

      <CollectionsList list={listPerPage} onCategoryClick={onCategoryClick} posterMap={posterMap} />

      <Pagination
        totalCount={list.length}
        currentPage={currentPage}
        siblingCount={2}
        pageSize={PAGE_SIZE}
        onPageChange={changePage}
        className="mx-auto"
      />
    </section>
  )
}
