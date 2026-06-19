import { Button } from '../../../components/ui/Button/Button'
import { SearchFilm } from '../../../components/ui/SearchFilm/SearchFilm'
import { useCallback, useState, memo } from 'react'
import { scrollBody } from '../../../utils/scrollBody'
import { ReactComponent as SearchIcon } from '@/assets/images/general/search.svg'

export const SearchFilmButton = memo(() => {
  const [isSearchShown, setSearchShown] = useState(false)

  const openSearch = useCallback(() => {
    scrollBody.stop()
    setSearchShown(true)
  }, [setSearchShown])

  const closeSearch = useCallback(() => {
    scrollBody.allow()
    setSearchShown(false)
  }, [setSearchShown])

  return (
    <>
      <Button onClick={openSearch} variant="icon">
        <SearchIcon />
      </Button>

      {isSearchShown && <SearchFilm className="fixed inset-0 pt-[env(safe-area-inset-top)]" onClose={closeSearch} />}
    </>
  )
})

SearchFilmButton.displayName = 'SearchFilmButton'
