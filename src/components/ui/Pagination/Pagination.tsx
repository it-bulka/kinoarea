import { type FC } from 'react'
import { usePagination, DOTS, type IPagination } from '../../../hooks/usePagination'
import { ReactComponent as ArrowRightIcon } from '../../../assets/images/general/arrow-nav-right.svg'
import { ReactComponent as ArrowLeftIcon } from '../../../assets/images/general/arrow-nav-left.svg'
import { twMerge } from 'tailwind-merge'

interface PaginationProps extends IPagination {
  className?: string
  onPageChange: (a: number) => void
}

const classes = {
  item: `w-[50px] h-[50px] rounded-10 bg-noir-card flex-center
          md:w-[73px] md:h-[73px] md:gap-[7px]`,
  itemActive: 'bg-gold text-noir',
  arrowDisabled: 'text-gray bg-transparent',
  arrowIcon: 'fill-currentColor',
  dot: 'flex-center md:w-[73px] md:h-[73px]',
}
export const Pagination: FC<PaginationProps> = ({
  className = '',
  onPageChange,
  totalCount,
  siblingCount,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    currentPage !== Math.ceil(totalCount / pageSize) && onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    currentPage !== 1 && onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <ul className={`flex gap-[5px] ${className} w-fit`}>
      <li
        className={twMerge(`${classes.item} ${classes.item} ${currentPage === 1 ? classes.arrowDisabled : ''}`)}
        onClick={onPrevious}
        onKeyDown={onPrevious}
        role={'menuitem'}
      >
        <ArrowLeftIcon className={classes.arrowIcon} />
      </li>

      {paginationRange.map((pageNumber, order) => {
        if (pageNumber === DOTS) {
          return (
            <li className={classes.dot} key={pageNumber + order}>
              &#8230;
            </li>
          )
        }

        return (
          <li
            className={twMerge(`${classes.item} ${pageNumber === currentPage ? classes.itemActive : ''}`)}
            onClick={() => onPageChange(pageNumber as number)}
            onKeyDown={() => onPageChange(pageNumber as number)}
            role={'menuitem'}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        )
      })}

      <li
        className={twMerge(`${classes.item} ${currentPage === lastPage ? classes.arrowDisabled : ''}`)}
        onClick={onNext}
        onKeyDown={onNext}
        role={'menuitem'}
      >
        <ArrowRightIcon className={classes.arrowIcon} />
      </li>
    </ul>
  )
}
