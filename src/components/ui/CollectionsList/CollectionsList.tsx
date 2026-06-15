import { ICategories } from '../../../api/types/categories'
import { Button } from '../Button/Button'
import { ReactComponent as Logo } from '../../../assets/images/general/logo-2.svg'
import { setMovieDBPath } from '../../../utils'
import { useTranslation } from 'react-i18next'
import { CategoriesTypes } from '../../../mock/categories'

interface CollectionsListProps<T extends ICategories> {
  list?: T[]
  onCategoryClick?: (category: ICategories) => void
  posterMap?: Record<string, string | null>
}
export function CollectionsList<T extends ICategories>({ list, onCategoryClick, posterMap }: CollectionsListProps<T>) {
  const { t } = useTranslation()
  return (
    <ul className={`mt-[25px] mb-[30px] md:mt-[15px] md:mb-12 lg:mb-[34px] 2xl:mt-20 2xl:mb-[70px]`}>
      {list?.map(item => (
        <li
          key={item.id}
          className={`
            flex items-center gap-2 px-2 pt-[14px] pb-[17px]
            md:mb-5 md:gap-5 md:mt-[13px]
            lg:gap-[50px] lg:mt-[22px] md:mb-[25px] `}
        >
          <div
            className={`
                bg-darkBlue-2 basis-1/3 shrink-0 aspect-square rounded-10 flex-center overflow-hidden
                md:basis-[73px] lg:basis-[231px]`}
          >
            {posterMap?.[item.id] ? (
              <img
                src={setMovieDBPath(posterMap[item.id]!)}
                alt={t(item.title)}
                className={'w-full h-full object-cover'}
              />
            ) : (
              <Logo className={'w-full text-white/10'} />
            )}
          </div>
          <div className={'flex-1 lg:flex justify-between items-center lg:gap-20'}>
            <div>
              <p className={'text-15 font-q-600 md:text-xl'}>{t(item.title)}</p>
              <p className={'text-xs text-yellowish mt-1.5 mb-[3px] md:mt-[14px] md:mb-4 lg:mt-8 lg:mb-0'}>
                {item.title.includes('.items.')
                  ? t(item.title.replace('.items.', '.descriptions.'))
                  : t(`collections.typeLabel.${item.types as CategoriesTypes}`)}
              </p>
            </div>

            <Button className={'text-sm'} size={'md'} onClick={() => onCategoryClick?.(item)}>
              {t('collections.browse')}
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
