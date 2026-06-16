import type { IPerson } from '../api/types'

export const getKnownForTitle = (knownFor: IPerson['known_for']): string | undefined => {
  const item = knownFor[0]
  if (!item) return undefined
  return 'title' in item ? item.title : item.name
}
