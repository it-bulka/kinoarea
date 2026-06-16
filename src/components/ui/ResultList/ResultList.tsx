import { IMovies } from '../../../api/types'
import { MovieItem } from '../MovieItem/MovieItem'
import { useNavigate } from 'react-router-dom'

interface ResultListProps {
  list: IMovies
}

export const ResultList = ({ list }: ResultListProps) => {
  const navigate = useNavigate()
  return (
    <ul className={'flex flex-col gap-3'}>
      {list.map(item => (
        <MovieItem
          name={item.title || item.name || ''}
          img={item.poster_path}
          overview={item.overview}
          rating={item.vote_average}
          key={item.id}
          onClick={() => navigate(`/films/${item.id}`)}
        />
      ))}
    </ul>
  )
}
