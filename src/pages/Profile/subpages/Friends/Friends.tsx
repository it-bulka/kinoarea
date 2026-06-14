import { useEffect } from 'react'
import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useActions } from '../../../../hooks/useActions'
import { Friend } from '../../../../components/ui/Friend/Friend'
import clsProfile from '../../Profile.module.scss'
import cls from './Friends.module.scss'
import { IncomingFriend } from '../../../../components/ui/IncomingFriend/IncomingFriend'
import { getCommonFriends } from '../../../../utils/getCommonFriends'

export const Friends = () => {
  const { friends } = useTypedSelector(state => state.userFriends)
  const { friends: incomingFriends } = useTypedSelector(state => state.incomingFriends)
  const incomingFriend = incomingFriends?.[0]
  const user = useTypedSelector(state => state.user.user)
  const { fetchUserFriends, fetchIncomingFriends, addUserFriend, removeIncomingFriend } = useActions()

  useEffect(() => {
    if (user?.friends) fetchUserFriends(user?.friends)
    if (user?.incomingFriends) fetchIncomingFriends(user?.incomingFriends)
  }, [fetchUserFriends, fetchIncomingFriends, user])
  const onAcceptFriend = (userId: string, friendId: string) => {
    addUserFriend(userId, friendId)
    removeIncomingFriend(userId, friendId)
  }
  return (
    <>
      <div className={clsProfile.titleWrapper}>
        <Typography variant="h2" type={TypographyTypes._TITLE}>
          Ваши друзья
        </Typography>
        <p>Всего: {friends.length}</p>
      </div>
      {incomingFriend && (
        <IncomingFriend
          img={incomingFriend.img || ''}
          name={`${incomingFriend.name} ${incomingFriend.surname}`}
          commonFriends={getCommonFriends(incomingFriend?.friends, user?.friends).length}
          onAccept={() => user && onAcceptFriend(user.id, incomingFriend.id)}
          onCancel={() => user && removeIncomingFriend(user.id, incomingFriend.id)}
        />
      )}

      <div className={cls.friends}>
        {friends?.map(friend => (
          <Friend img={friend.img} name={friend.name} surname={friend.surname} id={friend.id} key={friend.id} online />
        ))}
      </div>
    </>
  )
}
