export interface INews {
  id: string
  img: string
  date: number
  seen: number
  comments: number
  title: string
  details: string
  content?: string[]
  images?: string[]
}
