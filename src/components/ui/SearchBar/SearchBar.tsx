import { ReactComponent as SearchIcon } from '../../../assets/images/general/search.svg'
import { twMerge } from 'tailwind-merge'
import { ForwardedRef, forwardRef, KeyboardEventHandler, useCallback } from 'react'

interface SearchBarProps {
  className?: string
  onSearch?: () => void
}

export const SearchBar = forwardRef(
  ({ className, onSearch }: SearchBarProps, ref: ForwardedRef<HTMLInputElement | null>) => {
    const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
      e => {
        if (e.key === 'Enter') {
          onSearch?.()
        }
      },
      [onSearch]
    )

    return (
      <div
        className={twMerge('input input-padding flex items-center gap-3', className)}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
      >
        <input
          type="text"
          ref={ref}
          className={
            'flex-1 bg-transparent focus:outline-none font-inter font-light text-text-base placeholder:text-text-muted'
          }
        />
        <button
          onClick={onSearch}
          className={'flex-shrink-0 text-text-muted hover:text-gold transition-colors'}
          aria-label="Search"
        >
          <SearchIcon className={'w-5 h-5'} />
        </button>
      </div>
    )
  }
)

SearchBar.displayName = 'SearchBar'
