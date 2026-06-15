import { Outlet, useLoaderData, useNavigate, useRevalidator } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IPersonFullInfo } from '../../api/types/responses'
import type { IPersonCombinedCredits } from '../../api/types/responses'
import { usePageParam } from '../../hooks/usePageParam'
import { usePaginateData } from '../../hooks/usePaginateData'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useLastPathSegment } from '../../hooks/useLastPathsegment'
import { SectionHeader, SectionHeaderType } from '../../components/ui/SectionHeader/SectionHeader'
import { ActorSkeleton } from './ActorSkeleton'
import { ActorBio } from './sections/ActorBio'
import { ActorFilms, ActorFilmsPagination } from './sections/ActorFilms'
import { Images } from './sections/Images'

const filmsPerPageAmount = 10

export const Actor = () => {
  const actor = useLoaderData() as IPersonFullInfo
  const lastSegment = useLastPathSegment()
  const language = useTypedSelector(state => state.language.current)
  const revalidator = useRevalidator()
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    revalidator.revalidate()
  }, [language])

  const {
    data: filmsPerPage,
    setData: setFilmsPerPage,
    pagesData,
    setPagesData,
  } = usePaginateData<IPersonCombinedCredits[], ActorFilmsPagination>()
  const [currentPage, setCurrentPage] = usePageParam()

  useEffect(() => {
    const films = actor?.combined_credits?.cast
    if (!films) return

    const total_pages = Math.ceil(films.length / filmsPerPageAmount)
    setPagesData({ total_pages, page: currentPage, max_per_page: filmsPerPageAmount })
    setFilms(currentPage)
  }, [actor])

  const setFilms = useCallback(
    (page: number) => {
      const endItem = page * filmsPerPageAmount
      const startItem = endItem - filmsPerPageAmount
      setFilmsPerPage(actor.combined_credits.cast.slice(startItem, endItem + 1))
    },
    [actor.combined_credits.cast, setFilmsPerPage]
  )

  const switchFilms = (page: number) => {
    setCurrentPage(page)
    setFilms(page)
    setPagesData({ total_pages: pagesData!.total_pages, max_per_page: filmsPerPageAmount, page })
  }

  if (revalidator.state === 'loading') return <ActorSkeleton />
  if (!actor) return <div>{t('actor.notFound')}</div>

  const {
    name,
    profile_path,
    biography,
    birthday,
    place_of_birth,
    known_for_department,
    also_known_as,
    combined_credits,
    images,
  } = actor

  if (lastSegment === 'images') {
    return <Outlet context={{ images: images.profiles, title: name }} />
  }

  return (
    <div className={'container'}>
      <ActorBio
        name={name}
        profile_path={profile_path}
        biography={biography}
        also_known_as={also_known_as}
        birthday={birthday}
        place_of_birth={place_of_birth}
        known_for_department={known_for_department}
      />
      <ActorFilms
        films={filmsPerPage}
        totalCount={combined_credits?.cast.length}
        pagesData={pagesData}
        currentPage={currentPage}
        onPageChange={switchFilms}
        onFilmClick={id => navigate(`/films/${id}`)}
      />
      <section>
        <SectionHeader
          title={t('actor.photo')}
          type={SectionHeaderType.ARROW}
          linkTitle={t('actor.allPhotos')}
          moveToViaArrow={'images'}
        />
        <Images list={images?.profiles} title={name} />
      </section>
    </div>
  )
}
