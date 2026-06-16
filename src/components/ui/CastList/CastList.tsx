import { memo, useCallback, useMemo, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ICastRes } from '../../../api/types/responses'
import { setMovieDBPath } from '../../../utils'
import { AbsentImg } from '../AbsentImg/AbsentImg'

interface CastListProps {
  list: ICastRes[]
}

export const CastList = memo(({ list }: CastListProps) => {
  const navigate = useNavigate()

  const cast = useMemo(() => list.slice(0, 8), [list])

  const redirect = useCallback(
    (id: number) => {
      navigate(`/actors/${id}`)
    },
    [navigate]
  )

  const onKeyDown = useCallback(
    (id: number) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        redirect(id)
      }
    },
    [redirect]
  )

  return (
    <ul className={'grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-2.5 lg:grid-cols-6 xl:grid-cols-8'}>
      {cast.map(item => (
        <li key={item.id}>
          <div
            role={'button'}
            tabIndex={0}
            onClick={() => redirect(item.id)}
            onKeyDown={onKeyDown(item.id)}
            className={'group relative aspect-[2/3] rounded-10 overflow-hidden cursor-pointer'}
          >
            {item.profile_path ? (
              <img
                src={setMovieDBPath(item.profile_path)}
                alt={item.name}
                className={
                  'absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300'
                }
                loading={'lazy'}
              />
            ) : (
              <AbsentImg className={'absolute inset-0 w-full h-full'} />
            )}

            <div className={'absolute inset-0 bg-gradient-to-t from-noir/90 via-transparent to-transparent'} />

            <div className={'absolute bottom-0 left-0 right-0 p-2'}>
              <h5 className={'text-xs font-inter font-bold leading-tight'}>{item.name}</h5>
              {item.character && <p className={'text-[10px] text-gold-light mt-0.5 truncate'}>{item.character}</p>}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
})

CastList.displayName = 'CastList'
