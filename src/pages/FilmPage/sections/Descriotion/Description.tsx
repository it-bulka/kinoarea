import { useTranslation } from 'react-i18next'
import { Descript } from '../../../../components/ui/Descript/Descript'
import { IMovieDetailsRes } from '../../../../api/types/responses'
import { getDate } from '../../../../utils'

interface DescriptionProps extends IMovieDetailsRes {}

function getList<T extends Record<K, string>, K extends string>(list: T[], param: K): string[] {
  return list.map(item => item[param])
}

type DescriptItem = { id: string; title: string; descriptions: string[] }

export const Description = ({
  release_date,
  production_countries,
  tagline,
  production_companies,
  runtime,
  revenue,
  budget,
  genres,
  status,
  spoken_languages,
}: DescriptionProps) => {
  const { t, i18n } = useTranslation()
  const dateLocale = i18n.language === 'uk' ? 'uk-UA' : 'en-US'

  const items: DescriptItem[] = []

  items.push({ id: '1', title: t('film.details.year'), descriptions: [getDate(release_date, undefined, dateLocale)] })

  if (production_countries.length) {
    items.push({ id: '2', title: t('film.details.country'), descriptions: getList(production_countries, 'name') })
  }

  if (tagline) {
    items.push({ id: '3', title: t('film.details.tagline'), descriptions: [tagline] })
  }

  if (production_companies.length) {
    items.push({ id: '4', title: t('film.details.production'), descriptions: getList(production_companies, 'name') })
  }

  if (genres.length) {
    items.push({ id: '5', title: t('film.details.genres'), descriptions: getList(genres, 'name') })
  }

  if (status) {
    items.push({ id: '6', title: t('film.details.status'), descriptions: [status] })
  }

  if (spoken_languages.length) {
    items.push({ id: '7', title: t('film.details.languages'), descriptions: getList(spoken_languages, 'name') })
  }

  if (budget > 0) {
    items.push({ id: '8', title: t('film.details.budget'), descriptions: [`$${budget.toLocaleString()}`] })
  }

  if (revenue > 0) {
    items.push({ id: '9', title: t('film.details.revenue'), descriptions: [`$${revenue.toLocaleString()}`] })
  }

  if (runtime) {
    items.push({
      id: '10',
      title: t('film.details.runtime'),
      descriptions: [`${runtime} ${t('film.details.minUnit')}`],
    })
  }

  return (
    <ul className={'mt-7 mb-9 md:cols-2 md:mt-5 md:mb-6 lg:gap-7 lg:mt-11 lg:mb-12 2xl:gap-16'}>
      {items.map(item => (
        <Descript {...item} key={item.id} />
      ))}
    </ul>
  )
}
