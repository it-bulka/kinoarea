import { ICategory } from '../components/ui/Category/Category'
import { ICategories } from '../api/types/categories'

export type CategoriesTypes = 'genres' | 'category' | 'cast' | 'year' | 'tv'

const setCategoryYear = (): ICategories[] => {
  const current = new Date().getFullYear()
  const low = current - 100
  const years: ICategories[] = []

  for (let i = current; i >= low; i--) {
    years.push({ id: `year${i}`, title: `За ${i} рік`, amount: 0, types: 'year', params: { year: i } })
  }

  return years
}

const categories_year = setCategoryYear()

export const categories_2: ICategories[] = [
  /* category */
  { id: '25', title: 'collections.items.topRated', amount: 0, types: 'category', params: {}, category: 'top_rated' },
  { id: '26', title: 'collections.items.popular', amount: 0, types: 'category', params: {}, category: 'popular' },
  { id: '27', title: 'collections.items.upcoming', amount: 0, types: 'category', params: {}, category: 'upcoming' },
  {
    id: '28',
    title: 'collections.items.nowPlaying',
    amount: 0,
    types: 'category',
    params: {},
    category: 'now_playing',
  },
  { id: '19', title: 'collections.items.sharks', amount: 0, types: 'category', params: { with_keywords: '10050' } },
  {
    id: '20',
    title: 'collections.items.love',
    amount: 0,
    types: 'category',
    params: { with_keywords: '10149', with_genres: '10749,10402,10751' },
  },
  {
    id: '21',
    title: 'collections.items.school',
    amount: 0,
    types: 'category',
    params: { with_keywords: '6502', with_genres: '10751' },
  },
  { id: '22', title: 'collections.items.vampires', amount: 0, types: 'category', params: { with_keywords: '2' } },
  { id: '23', title: 'collections.items.zombies', amount: 0, types: 'category', params: { with_keywords: '3234' } },
  { id: '24', title: 'collections.items.war', amount: 0, types: 'category', params: { with_keywords: '9882' } },

  /* genres */
  { id: '1', title: 'collections.items.action', amount: 0, types: 'genres', params: { with_genres: '28' } },
  { id: '2', title: 'collections.items.adventure', amount: 0, types: 'genres', params: { with_genres: '12' } },
  { id: '3', title: 'collections.items.fantasy', amount: 0, types: 'genres', params: { with_genres: '14' } },
  { id: '4', title: 'collections.items.historical', amount: 0, types: 'genres', params: { with_genres: '36' } },
  { id: '5', title: 'collections.items.horror', amount: 0, types: 'genres', params: { with_genres: '27' } },
  { id: '6', title: 'collections.items.musical', amount: 0, types: 'genres', params: { with_genres: '10402' } },
  { id: '7', title: 'collections.items.romance', amount: 0, types: 'genres', params: { with_genres: '10749' } },
  { id: '8', title: 'collections.items.scifi', amount: 0, types: 'genres', params: { with_genres: '878' } },
  { id: '9', title: 'collections.items.thriller', amount: 0, types: 'genres', params: { with_genres: '53' } },
  { id: '10', title: 'collections.items.warMovies', amount: 0, types: 'genres', params: { with_genres: '10752' } },
  { id: '11', title: 'collections.items.animation', amount: 0, types: 'genres', params: { with_genres: '16' } },
  { id: '12', title: 'collections.items.comedy', amount: 0, types: 'genres', params: { with_genres: '35' } },
  { id: '13', title: 'collections.items.crime', amount: 0, types: 'genres', params: { with_genres: '80' } },
  { id: '14', title: 'collections.items.documentary', amount: 0, types: 'genres', params: { with_genres: '99' } },
  { id: '15', title: 'collections.items.drama', amount: 0, types: 'genres', params: { with_genres: '18' } },
  { id: '16', title: 'collections.items.family', amount: 0, types: 'genres', params: { with_genres: '10751' } },
  { id: '17', title: 'collections.items.mystery', amount: 0, types: 'genres', params: { with_genres: '9648' } },
  { id: '18', title: 'collections.items.western', amount: 0, types: 'genres', params: { with_genres: '37' } },
  /* year */
  ...categories_year,
  /* cast */
  { id: 'cast_38', title: 'collections.items.castJohnnyDepp', amount: 0, types: 'cast', params: { with_cast: '85' } },
  { id: 'cast_39', title: 'collections.items.castTomCruise', amount: 0, types: 'cast', params: { with_cast: '500' } },
  {
    id: 'cast_40',
    title: 'collections.items.castRobertDowneyJr',
    amount: 0,
    types: 'cast',
    params: { with_cast: '3223' },
  },
  {
    id: 'cast_41',
    title: 'collections.items.castSandraBullock',
    amount: 0,
    types: 'cast',
    params: { with_cast: '191' },
  },
  {
    id: 'cast_42',
    title: 'collections.items.castAngelinaJolie',
    amount: 0,
    types: 'cast',
    params: { with_cast: '11701' },
  },
  {
    id: 'cast_43',
    title: 'collections.items.castDanielCraig',
    amount: 0,
    types: 'cast',
    params: { with_cast: '8784' },
  },
  { id: 'cast_44', title: 'collections.items.castJimCarrey', amount: 0, types: 'cast', params: { with_cast: '206' } },
  { id: 'cast_45', title: 'collections.items.castWillSmith', amount: 0, types: 'cast', params: { with_cast: '2888' } },
  { id: 'cast_46', title: 'collections.items.castTomHardy', amount: 0, types: 'cast', params: { with_cast: '2524' } },
  { id: 'cast_47', title: 'collections.items.castTomHanks', amount: 0, types: 'cast', params: { with_cast: '31' } },
  {
    id: 'cast_48',
    title: 'collections.items.castMorganFreeman',
    amount: 0,
    types: 'cast',
    params: { with_cast: '192' },
  },
  {
    id: 'cast_49',
    title: 'collections.items.castRobertDeNiro',
    amount: 0,
    types: 'cast',
    params: { with_cast: '380' },
  },
  {
    id: 'cast_50',
    title: 'collections.items.castMatthewMcConaughey',
    amount: 0,
    types: 'cast',
    params: { with_cast: '10297' },
  },
  {
    id: 'cast_51',
    title: 'collections.items.castSamuelLJackson',
    amount: 0,
    types: 'cast',
    params: { with_cast: '2231' },
  },
]

export const persons = [
  { id: '1', title: 'За год', isActive: false },
  { id: '2', title: 'За месяц', isActive: false },
  { id: '3', title: 'За неделю', isActive: false },
]

export const genres = [
  { id: '1', title: 'Все', isActive: false },
  { id: '2', title: 'Боевики', isActive: false, param: '28' },
  { id: '3', title: 'Приключения', isActive: false, param: '12' },
  { id: '4', title: 'Комедии', isActive: false, param: '35' },
  { id: '5', title: 'Фантастика', isActive: false, param: '14' },
  { id: '6', title: 'Триллеры', isActive: false, param: '53' },
  { id: '7', title: 'Драма', isActive: false, param: '18' },
]

const getYearsCategories = (): ICategory[] => {
  const currentYear = new Date().getFullYear()
  const years = [{ id: '1', title: 'Всё время', isActive: false }]
  for (let i = 0; i <= 5; i++) {
    const y = (currentYear - i).toString()
    const id = (i + 2).toString()
    years.push({ id, title: y, isActive: false })
  }

  return years
}

export const years = getYearsCategories()

export const profit = [
  { id: '1', title: 'Украина', isActive: false },
  { id: '2', title: 'Весь мир ', isActive: false },
  { id: '3', title: 'США и Канада', isActive: false },
]
