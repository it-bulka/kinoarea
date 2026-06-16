import { IPoster } from '../../../api/types/responses'
import { useMemo } from 'react'
import { setMovieDBPath } from '../../../utils'

interface PostersListProps {
  list: IPoster[]
  title: string
}
const maxAmount = 4
export const PostersList = ({ list, title }: PostersListProps) => {
  const posters = useMemo(() => {
    if (list.length > maxAmount) {
      return {
        list: list.slice(0, maxAmount),
        othersAmount: list.length - maxAmount,
      }
    }
    return { list }
  }, [list])
  return (
    <>
      <h3 className={'font-inter font-semibold text-base md:mb-4 lg:mb-7'}>{title}</h3>
      <div className={'grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-1.5 lg:gap-2 2xl:gap-[22px]'}>
        {posters?.list.map((item, order) => (
          <div key={order} className={'relative overflow-hidden rounded-10'}>
            {posters?.othersAmount && order === maxAmount - 1 && (
              <div className={'absolute inset-0 bg-gold/50 flex flex-center font-inter font-bold text-4xl'}>
                <p>+{posters?.othersAmount}</p>
              </div>
            )}

            <img src={setMovieDBPath(item.file_path)} alt={`${title}`} className={'w-full object-cover'} />
          </div>
        ))}
      </div>
    </>
  )
}
