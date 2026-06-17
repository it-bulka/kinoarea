import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export function usePageParam(defaultPage = 1): [number, (page: number) => void] {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || defaultPage)

  const setPage = useCallback(
    (newPage: number) => {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev)
        next.set('page', String(newPage))
        return next
      })
    },
    [setSearchParams]
  )

  return [page, setPage]
}
