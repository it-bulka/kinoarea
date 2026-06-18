import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { IMovieRes } from '../../api/types'
import { NewsFilmCard } from '../../components/ui/NewsFilmCard/NewsFilmCard'

interface NewsFilmGridProps {
  films: IMovieRes[]
  onFilmClick: (id: number) => void
}

export const NewsFilmGrid = ({ films, onFilmClick }: NewsFilmGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!gridRef.current || !films.length) return
      gsap.fromTo(
        gridRef.current.querySelectorAll('.news-film-card'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out', clearProps: 'all' }
      )
    },
    { scope: gridRef, dependencies: [films] }
  )

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-7 gap-2.5 md:gap-3 lg:gap-4 mb-8 md:mb-10 2xl:mb-[60px]"
    >
      {films.map(film => (
        <NewsFilmCard key={film.id} item={film} onClick={onFilmClick} />
      ))}
    </div>
  )
}
