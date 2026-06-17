import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ProfilePages } from '../../../../router/paths'
import { ReactComponent as FriendIcon } from '../../../../assets/images/general/friend.svg'
import { ReactComponent as ReviewIcon } from '../../../../assets/images/general/review.svg'
import { ReactComponent as LikesIcon } from '../../../../assets/images/general/likes.svg'
import { ReactComponent as FilmsIcon } from '../../../../assets/images/general/films.svg'
import { ReactComponent as FamousIcon } from '../../../../assets/images/general/famous.svg'
import cls from './ProfileMain.module.scss'

const listItems = [
  { id: 1, path: ProfilePages.friends, icon: <FriendIcon />, labelKey: 'friends.title' },
  { id: 2, path: ProfilePages.reviews, icon: <ReviewIcon />, labelKey: 'reviews.title' },
  { id: 3, path: ProfilePages.likes, icon: <LikesIcon />, labelKey: 'likes.title' },
  { id: 4, path: ProfilePages.films, icon: <FilmsIcon />, labelKey: 'favouriteFilms.title' },
  { id: 5, path: ProfilePages.famous, icon: <FamousIcon />, labelKey: 'famous.title' },
]

export const ProfileListsSection = memo(() => {
  const { t } = useTranslation()

  return (
    <section className={cls.listsSection} aria-label="Your Lists">
      <h3 className={cls.listsTitle}>{t('profile.lists.title')}</h3>
      <div className={cls.listsGrid}>
        {listItems.map(item => (
          <Link key={item.id} to={item.path} className={cls.listCard}>
            <span className={cls.listIcon}>{item.icon}</span>
            <span className={cls.listLabel}>{t(item.labelKey)}</span>
          </Link>
        ))}
      </div>
    </section>
  )
})
ProfileListsSection.displayName = 'ProfileListsSection'
