import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ICastRes } from '../../api/types/responses'
import { PersonItem } from '../../components/ui/PersonItem/PersonItem'

interface FilmActorsListProps {
  cast: ICastRes[]
  onActorClick: (id: number) => void
}

export const FilmActorsList = ({ cast, onActorClick }: FilmActorsListProps) => {
  const listRef = useRef<HTMLUListElement>(null)

  useGSAP(
    () => {
      if (!listRef.current || !cast.length) return
      gsap.fromTo(
        listRef.current.querySelectorAll('.actor-item'),
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.45, stagger: 0.055, ease: 'power2.out', clearProps: 'all' }
      )
    },
    { scope: listRef, dependencies: [cast] }
  )

  return (
    <ul ref={listRef} className="mb-8 md:mb-10 2xl:mb-14">
      {cast.map((actor, index) => (
        <PersonItem
          key={actor.id}
          img={actor.profile_path}
          name={actor.name}
          character={actor.character}
          rating={actor.popularity}
          department={actor.known_for_department}
          index={index}
          onClick={() => onActorClick(actor.id)}
        />
      ))}
    </ul>
  )
}
