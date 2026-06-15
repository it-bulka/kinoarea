import { IMovieRes } from '../../api/types'
import { IDiscoverResult } from '../../api/types/responses'

export type MovieSchedule = Array<[string, IMovieRes[]]>
export type PageInfo = Omit<IDiscoverResult, 'results'>
