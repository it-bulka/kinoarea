import { memo } from 'react'
import { Typography, TypographyTypes } from '../Typography/Typography'
import { CategoryList } from '../CategoryList/CattegoryList'
import { ReactComponent as BurgerIcon } from '../../../assets/images/general/burger.svg'
import { ICategory } from '../Category/Category'
import { Link } from '../Link/Link'
import classnames from 'classnames'

export enum SectionHeaderType {
  REGULAR = 'regular',
  ARROW = 'arrow',
}

interface Category {
  type?: SectionHeaderType.REGULAR
  categories: ICategory[]
}
interface Arrow {
  type: SectionHeaderType.ARROW
  linkTitle: string
  moveToViaArrow?: string
  onArrowClick?: () => void
  state?: any
}

type SectionHeaderProps = {
  title: string
  className?: string
  onCategoryClick?: (a: ICategory) => void
} & (Category | Arrow)

export const SectionHeader = memo((props: SectionHeaderProps) => {
  const { title, className, type = SectionHeaderType.REGULAR, onCategoryClick } = props
  if (type === SectionHeaderType.ARROW) {
    const { linkTitle, onArrowClick, moveToViaArrow = '', state } = props as Arrow
    return (
      <div className={`flex flex-col gap-2 items-center md:flex-row md:justify-between ${className}`}>
        <Typography variant={'h2'} type={TypographyTypes._TITLE}>
          {title}
        </Typography>
        <Link
          path={moveToViaArrow}
          title={linkTitle}
          onClick={onArrowClick}
          state={state}
          className={classnames('text-base font-inter font-bold text-gold hover:text-gold-light transition-colors')}
        />
      </div>
    )
  }

  const { categories } = props as Category

  return (
    <div className={'mt-5 mb-[30px] xl:flex xl:justify-between xl:items-center'}>
      <Typography variant={'h2'} type={TypographyTypes._TITLE} className={'relative mx-auto mb-5 w-fit md:mx-0'}>
        <>
          {title}
          <BurgerIcon className={'absolute top-1/2 -right-8 --translate-y-1/2 fill-white md:hidden'} />
        </>
      </Typography>
      <div className={'hidden xl:block w-[51px] h-0 border-b-2 border-gold/40 border-solid mx-2'} />
      <CategoryList list={categories} className={'mt-4 xl:mt-0'} onItemClick={onCategoryClick} />
    </div>
  )
})

SectionHeader.displayName = 'SectionHeader'
