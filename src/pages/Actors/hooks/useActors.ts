import { useCallback, useEffect, useState } from 'react'
import { IPerson, IPersonResult } from '../../../api/types/responses'
import { getPersons } from '../../../api/movieDBApi'
import { usePageParam } from '../../../hooks/usePageParam'
import { scrollTop } from '../../../utils/scrollTop'

export const useActors = () => {
  const [currentPage, setCurrentPage] = usePageParam()
  const [actors, setActors] = useState<IPerson[]>([])
  const [pagesData, setPagesData] = useState<Omit<IPersonResult, 'results'> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchActors = useCallback(async (page: number) => {
    setIsLoading(true)
    const { results, ...rest } = await getPersons({ page })
    setActors(results)
    setPagesData(rest)
    scrollTop()
    setIsLoading(false)
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchActors(currentPage)
  }, [])

  const onPageChange = useCallback(
    (page: number) => {
      setCurrentPage(page)
      fetchActors(page)
    },
    [fetchActors, setCurrentPage]
  )

  return { actors, pagesData, isLoading, currentPage, onPageChange }
}
