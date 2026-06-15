import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ICategories } from '../../../api/types/categories'
import { CollectionCard } from '../CollectionCard/CollectionCard'

interface CollectionsListProps<T extends ICategories> {
  list?: T[]
  onCategoryClick: (category: ICategories) => void
  posterMap?: Record<string, string | null>
}

export function CollectionsList<T extends ICategories>({ list, onCategoryClick, posterMap }: CollectionsListProps<T>) {
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!gridRef.current || !list?.length) return
      gsap.fromTo(
        gridRef.current.querySelectorAll('.collection-card'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out', clearProps: 'all' }
      )
    },
    { scope: gridRef, dependencies: [list] }
  )

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mt-6 mb-8 md:mt-8 md:mb-10 2xl:mt-12 2xl:mb-[60px]"
    >
      {list?.map(item => (
        <CollectionCard key={item.id} item={item} posterUrl={posterMap?.[item.id] ?? null} onClick={onCategoryClick} />
      ))}
    </div>
  )
}
