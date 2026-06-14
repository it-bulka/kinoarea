import { type LoaderFunctionArgs } from 'react-router-dom'
import { getPersonFullInfo } from '../../api/movieDBApi'

export const loadActor = async ({ params }: LoaderFunctionArgs) => {
  if (params.actorId) return await getPersonFullInfo(params.actorId)
  return null
}
