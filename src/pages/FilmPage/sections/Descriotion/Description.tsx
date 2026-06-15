import { Descript } from '../../../../components/ui/Descript/Descript'
import { IMovieDetailsRes } from '../../../../api/types/responses'
import { getDate } from '../../../../utils'
import { useTranslation } from 'react-i18next'

interface DescriptionProps extends IMovieDetailsRes {}

function getList<T extends Record<K, string>, K extends string>(list: T[], param: K): string[] {
  return list.map(item => item[param])
}
export const Description = ({
  release_date,
  production_countries,
  tagline,
  production_companies,
  runtime,
  revenue,
  budget,
  genres,
}: DescriptionProps) => {
  const { t } = useTranslation()

  const list = [
    { id: '1', title: t('film.details.year'), descriptions: [getDate(release_date)] },
    { id: '2', title: t('film.details.country'), descriptions: getList(production_countries, 'iso_3166_1') },
    { id: '3', title: t('film.details.tagline'), descriptions: [tagline] },
    { id: '4', title: t('film.details.production'), descriptions: getList(production_companies, 'name') },
    { id: '5', title: t('film.details.genres'), descriptions: getList(genres, 'name') },
    { id: '6', title: t('film.details.budget'), descriptions: ['$ ' + budget] },
    { id: '7', title: t('film.details.revenue'), descriptions: ['$ ' + revenue.toString()] },
    { id: '8', title: t('film.details.runtime'), descriptions: [runtime.toString() + ' min'] },
  ]
  return (
    <ul className={'mt-7 mb-9 md:cols-2 md:mt-5 md:mb-6 lg:gap-7 lg:mt-11 lg:mb-12 2xl:gap-16'}>
      {list.map(item => (
        <Descript {...item} key={item.id} />
      ))}
    </ul>
  )
}
