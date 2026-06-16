import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { IPoster } from '../../api/types/responses'
import { setMovieDBPath } from '../../utils'
import cls from './FilmPostersGrid.module.scss'

interface FilmPostersGridProps {
  posters: IPoster[]
}

export const FilmPostersGrid = ({ posters }: FilmPostersGridProps) => {
  const gridRef = useRef<HTMLUListElement>(null)

  useGSAP(
    () => {
      if (!gridRef.current || !posters.length) return
      gsap.fromTo(
        gridRef.current.querySelectorAll('.poster-item'),
        { opacity: 0, y: 40, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
      )
    },
    { scope: gridRef, dependencies: [posters] }
  )

  return (
    <ul ref={gridRef} className={cls.grid}>
      {posters.map((poster, index) => (
        <li key={poster.file_path} className={`${cls.item} poster-item`}>
          <img
            src={setMovieDBPath(poster.file_path)}
            alt={`Poster ${index + 1}`}
            className={cls.image}
            loading={'lazy'}
          />

          <div className={cls.overlay} />

          <div className={cls.caption}>
            <span className={cls.index}>#{index + 1}</span>
            {poster.iso_639_1 && <span className={cls.lang}>{poster.iso_639_1}</span>}
          </div>
        </li>
      ))}
    </ul>
  )
}
