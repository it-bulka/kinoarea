import { ReactComponent as SearchIcon } from '../../../assets/images/general/search.svg'
import { twMerge } from 'tailwind-merge'
import { ForwardedRef, forwardRef, ChangeEvent } from 'react'

interface SearchBarProps {
  className?: string
  onChange?: (value: string) => void
}

export const SearchBar = forwardRef(
  ({ className, onChange }: SearchBarProps, ref: ForwardedRef<HTMLInputElement | null>) => {
    return (
      <div className={twMerge('input input-padding flex items-center gap-3', className)}>
        <input
          ref={ref}
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none font-inter font-light text-text-base placeholder:text-text-muted"
        />

        <SearchIcon className="w-5 h-5 text-text-muted" />
      </div>
    )
  }
)

SearchBar.displayName = 'SearchBar'
