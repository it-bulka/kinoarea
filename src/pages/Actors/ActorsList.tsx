import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { IPerson } from '../../api/types/responses'
import { PersonItem } from '../../components/ui/PersonItem/PersonItem'

interface ActorsListProps {
  actors: IPerson[]
  onActorClick: (id: number) => void
}

export const ActorsList = ({ actors, onActorClick }: ActorsListProps) => {
  const listRef = useRef<HTMLUListElement>(null)

  useGSAP(
    () => {
      if (!listRef.current || !actors.length) return
      gsap.fromTo(
        listRef.current.querySelectorAll('.actor-item'),
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.45, stagger: 0.055, ease: 'power2.out', clearProps: 'all' }
      )
    },
    { scope: listRef, dependencies: [actors] }
  )

  return (
    <ul ref={listRef} className="mb-8 md:mb-10 2xl:mb-14">
      {actors.map((actor, index) => (
        <PersonItem
          key={actor.id}
          img={actor.profile_path}
          name={actor.name}
          rating={actor.popularity}
          known_for={actor.known_for}
          department={actor.known_for_department}
          index={index}
          onClick={() => onActorClick(actor.id)}
        />
      ))}
    </ul>
  )
}
