import { useEffect, useState } from 'react'
import { ICategories } from '../../../api/types/categories'
import { getSearch } from '../../../api/movieDBApi'
import { IGetSearchParams } from '../../../api/types/requests'

export const usePosterMap = (listPerPage: ICategories[]): Record<string, string | null> => {
  const [posterMap, setPosterMap] = useState<Record<string, string | null>>({})

  useEffect(() => {
    let cancelled = false

    const fetchPosters = async () => {
      const entries = await Promise.all(
        listPerPage.map(async item => {
          const options: IGetSearchParams = {
            type: 'movie',
            params: { ...item.params, page: 1 },
          }
          if (item.category) options.category = item.category
          const data = await getSearch(options)
          return [item.id, data?.results[0]?.poster_path ?? null] as [string, string | null]
        })
      )
      if (!cancelled) setPosterMap(Object.fromEntries(entries))
    }

    fetchPosters()

    return () => {
      cancelled = true
    }
  }, [listPerPage])

  return posterMap
}
