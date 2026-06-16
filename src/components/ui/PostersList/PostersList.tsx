import { memo, useMemo } from 'react'
import { IPoster } from '../../../api/types/responses'
import { setMovieDBPath } from '../../../utils'

interface PostersListProps {
  list: IPoster[]
}

const MAX_AMOUNT = 5

const PostersListBase = ({ list }: PostersListProps) => {
  const posters = useMemo(() => {
    if (list.length > MAX_AMOUNT) {
      return { list: list.slice(0, MAX_AMOUNT), othersAmount: list.length - MAX_AMOUNT }
    }
    return { list, othersAmount: 0 }
  }, [list])

  return (
    <ul className={'grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-2.5 xl:grid-cols-5 xl:gap-3'}>
      {posters.list.map((item, order) => (
        <li key={order} className={'group relative aspect-[230/310] rounded-10 overflow-hidden'}>
          <img
            src={setMovieDBPath(item.file_path)}
            alt={`Poster ${order + 1}`}
            className={
              'absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
            }
            loading={'lazy'}
          />

          <div
            className={'absolute inset-0 bg-noir/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300'}
          />

          {posters.othersAmount > 0 && order === MAX_AMOUNT - 1 && (
            <div className={'absolute inset-0 bg-noir/70 flex items-center justify-center'}>
              <p className={'font-inter font-bold text-3xl md:text-4xl'}>+{posters.othersAmount}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export const PostersList = memo(PostersListBase)
PostersList.displayName = 'PostersList'
