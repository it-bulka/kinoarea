import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PersonItem } from '../PersonItem/PersonItem'
import { IFbFavouritePerson } from '../../../api/types/person'

interface FbPersonListProps {
  list: IFbFavouritePerson[]
}

export const FbPersonList = memo(({ list }: FbPersonListProps) => {
  const navigate = useNavigate()

  return (
    <ul>
      {list.map(person => (
        <PersonItem
          key={person.id}
          img={person.profile_path ?? undefined}
          name={person.name}
          rating={person.popularity}
          known_for={[]}
          onClick={() => navigate(`/actors/${person.id}`)}
        />
      ))}
    </ul>
  )
})

FbPersonList.displayName = 'FbPersonList'
