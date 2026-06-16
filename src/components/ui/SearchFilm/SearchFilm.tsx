import { SearchBar } from '../SearchBar/SearchBar'
import { twMerge } from 'tailwind-merge'
import { SearchedItem } from '../SearchedItem/SearchedItem'
import { ReactComponent as CloseIcon } from '../../../assets/images/general/close-btn.svg'
import { KeyboardEventHandler, MouseEventHandler, useCallback, useRef, useState } from 'react'
import { getSearchedItem } from '../../../api/movieDBApi'
import { ISearchMovieResult, ISearchResult } from '../../../api/types/responses'
import { setMovieDBPath } from '../../../utils'
import { Button } from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface SearchFilmProps {
  className?: string
  onClose?: () => void
}

export const SearchFilm = ({ className, onClose }: SearchFilmProps) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const [searched, setSearched] = useState<ISearchMovieResult[]>([])
  const [pages, setPages] = useState<Pick<ISearchResult, 'page' | 'total_pages'>>({ page: 0, total_pages: 0 })
  const navigate = useNavigate()
  const { t } = useTranslation()
  const handleSearch = async () => {
    const finded = await getSearchedItem(ref.current?.value)

    if (!finded) return
    const { page, total_pages, results } = finded
    results && setSearched(results)
    setPages({ page, total_pages })
  }

  const handleMoreClick = async () => {
    const finded = await getSearchedItem(ref.current?.value, pages.page + 1)

    if (!finded) return
    const { page, total_pages, results } = finded
    results && setSearched(prev => [...prev, ...results])
    setPages({ page, total_pages })
  }

  const onWrapperClick: MouseEventHandler<HTMLDivElement> = e => {
    const elem = e.target
    if ((elem as HTMLElement).closest('.content')) return
    onClose?.()
  }

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    e => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    },
    [onClose]
  )

  const onItemClick = (id: number) => {
    onClose?.()
    navigate(`/films/${id}`)
  }

  return (
    <div
      className={twMerge('z-[100] bg-noir/80 backdrop-blur-sm', className)}
      role="button"
      onClick={onWrapperClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className={'content container pt-2'}>
        <div className={'flex items-center gap-2 md:relative'}>
          <SearchBar className={'flex-1'} ref={ref} onSearch={handleSearch} />
          <button
            className={'md:absolute md:top-1/2 md:-right-2 md:translate-x-full md:-translate-y-1/2 lg:-right-4'}
            onClick={onClose}
          >
            <CloseIcon className={'stroke-white'} />
          </button>
        </div>

        <div className={'max-h-[80vh] overflow-auto mt-4'}>
          {searched.map(item => {
            if (item.media_type !== 'movie') return
            return (
              <SearchedItem
                img={setMovieDBPath(item.poster_path)}
                title={item.title || item.name || ''}
                originalName={item.original_title || item.original_name || ''}
                genre={'----'}
                rate={item.popularity}
                onClick={() => onItemClick(item.id)}
                className={'[&:not(:last-of-type)]:mb-2 shadow-lg shadow-dark'}
                key={item.id}
              />
            )
          })}

          {pages.page < pages.total_pages && (
            <div className={'pt-4 shadow-lg shadow-dark'}>
              <Button variant={'transparent'} onClick={handleMoreClick} className={'mx-auto'}>
                {t('common.showMore')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
