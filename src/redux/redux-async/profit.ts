import { type Dispatch } from 'redux'
import { ProfitActionCreators } from '../actionsCreators/profit'
import { type ProfitActions } from '../actions/profit'
import { getSearch, getMovieDetails } from '../../api/movieDBApi'
import { BaseMovieDBAssetsUrl } from '../../api/endpoints'
import { type IMovieDetailsRes } from '../../api/types/responses'
import { type IIncome } from '../../api/types'
import { type IParams } from '../../api/types/requests'

const TOP_MOVIES_COUNT = 6
const FETCH_POOL_SIZE = 10

export interface ProfitFetchOptions {
  from?: string
  to?: string
  region?: string
}

const toIIncome = (d: IMovieDetailsRes): IIncome => ({
  id: String(d.id),
  img: `${BaseMovieDBAssetsUrl}${d.poster_path}`,
  title: d.title,
  income: Math.round(d.revenue / 1_000_000),
  info: `${String(d.release_date).slice(0, 4)} · ${d.vote_average.toFixed(1)} ★`,
})

export const fetchProfitMovies = (options?: ProfitFetchOptions) => {
  return async (dispatch: Dispatch<ProfitActions>) => {
    try {
      dispatch(ProfitActionCreators.loadProfitItems())

      const params: IParams = { sort_by: 'revenue.desc', 'vote_count.gte': 200 }
      if (options?.region) params.region = options.region
      if (options?.from) params['primary_release_date.gte'] = options.from
      if (options?.to) params['primary_release_date.lte'] = options.to

      const { results } = await getSearch({ type: 'movie', params })

      const ids = results.slice(0, FETCH_POOL_SIZE).map(m => String(m.id))
      const details = await Promise.all(ids.map(id => getMovieDetails(id)))

      const items = details
        .filter(d => d.revenue > 0)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, TOP_MOVIES_COUNT)
        .map(toIIncome)

      dispatch(ProfitActionCreators.addProfitItems(items))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Smth went wrong'
      dispatch(ProfitActionCreators.errorProfitItems(message))
    }
  }
}
