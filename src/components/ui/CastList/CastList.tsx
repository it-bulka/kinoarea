import { ICastRes } from '../../../api/types/responses'
import { setMovieDBPath } from '../../../utils'
import { memo, useCallback, useMemo, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface CastListProps {
  list: ICastRes[]
}
export const CastList = memo(({ list }: CastListProps) => {
  const navigate = useNavigate()
  const cast = useMemo(() => {
    const maxAmount = 8
    if (list.length > 8) {
      return list.slice(0, maxAmount)
    }
    return list
  }, [list])

  const redirect = useCallback((id: number) => {
    navigate(`/actors/${id}`)
  }, [])

  const onKeyDown = useCallback((id: number) => {
    return (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        redirect(id)
      }
    }
  }, [])

  return (
    <div
      className={`grid grid-cols-2 gap-x-[8.9%] gap-y-5 
        md:gap-y-[62px] 
        lg:grid-cols-3 lg:gap-y-10 lg:gap-x-12 
        2xl:grid-cols-5 2xl:gap-y-14`}
    >
      {cast.map(item => (
        <div
          key={item.id}
          onClick={() => redirect(item.id)}
          onKeyDown={onKeyDown(item.id)}
          tabIndex={0}
          role={'button'}
        >
          <img
            src={setMovieDBPath(item.profile_path)}
            alt={item.name}
            className={'rounded-[5px] aspect-square object-cover mb-1.5 md:mb-4'}
          />
          <h5 className={'text-sm font-inter font-bold md:text-lg'}>{item.name}</h5>
          <p className={'text-xs text-text-muted my-[3px] md:text-15 md:my-3'}>{item.original_name}</p>
          <p className={'text-xs text-gold-light md:text-base'}>{item.character}</p>
        </div>
      ))}
    </div>
  )
})

CastList.displayName = 'CastList'
