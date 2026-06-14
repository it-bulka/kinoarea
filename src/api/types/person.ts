export interface IPerson {
  id: string
  img: string
  rate: string | number
  actor: string
  originalActorName: string
  age: number
}

export interface IFbFavouritePerson {
  id: number
  name: string
  profile_path: string | null
  popularity: number
}
