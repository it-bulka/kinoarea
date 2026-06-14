import { type Dispatch } from 'redux'
import { ProfitActionCreators } from '../actionsCreators/profit'
import { type ProfitActions } from '../actions/profit'
import { getSearch, getMovieDetails } from '../../api/movieDBApi'
import { BaseMovieDBAssetsUrl } from '../../api/endpoints'
import { type IMovieDetailsRes } from '../../api/types/responses'
import { type IIncome } from '../../api/types'

const TOP_MOVIES_COUNT = 5
const FETCH_POOL_SIZE = 10

const toIIncome = (d: IMovieDetailsRes): IIncome => ({
  id: String(d.id),
  img: `${BaseMovieDBAssetsUrl}${d.poster_path}`,
  title: d.title,
  income: Math.round(d.revenue / 1_000_000),
  info: `${String(d.release_date).slice(0, 4)} · ${d.vote_average.toFixed(1)} ★`,
})

export const fetchProfitMovies = () => {
  return async (dispatch: Dispatch<ProfitActions>) => {
    try {
      dispatch(ProfitActionCreators.loadProfitItems())

      const { results } = await getSearch({
        type: 'movie',
        params: { sort_by: 'revenue.desc', 'vote_count.gte': 200 },
      })

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
