import { useRef, useState, useCallback } from 'react'
import { Editor } from '../Editor/Editor'
import { AbsentImg } from '../AbsentImg/AbsentImg'
import { Button } from '../Button/Button'
import { Spinner } from '../Spinner/Spinner'
import type { IUserReview } from '../../../api/types/responses'
import { useActions } from '../../../hooks/useActions'
import { FirebaseApi } from '../../../api/firebase'
import { Timestamp } from 'firebase/firestore'
import { twMerge } from 'tailwind-merge'
import { notificationList } from '../../../mock/notificationList'
import { useTranslation } from 'react-i18next'

const MAX_CHARS = 2000

interface CommentProps extends Pick<IUserReview, 'movie' | 'userId'> {
  userImg: string
  userName: string
  userSurname: string
  className?: string
  onReviewSent: (review: IUserReview) => void
}

export const Comment = ({ userId, userImg, userName, userSurname, movie, className, onReviewSent }: CommentProps) => {
  const editorValRef = useRef<string>('')
  const [editorKey, setEditorKey] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [isSending, setIsSending] = useState(false)
  const { setNotification } = useActions()
  const { t } = useTranslation()

  const handleContentChange = useCallback((val: string) => {
    editorValRef.current = val
    const stripped = val.replace(/<[^>]+>/g, '').trim()
    setCharCount(stripped.length)
  }, [])

  const sendMessage = async () => {
    const content = editorValRef.current
    const stripped = content.replace(/<[^>]+>/g, '').trim()
    if (!stripped || isSending || stripped.length > MAX_CHARS) return

    const reviewData: Omit<IUserReview, 'id'> = {
      userId,
      created_at: Timestamp.now(),
      movie,
      author_details: {
        name: userName,
        username: userSurname,
        avatar_path: userImg,
        rating: 0,
      },
      content,
    }

    setIsSending(true)
    try {
      const created = await FirebaseApi.setUserReview(reviewData)
      editorValRef.current = ''
      setCharCount(0)
      setEditorKey(prev => prev + 1)
      onReviewSent(created)
    } catch {
      setNotification(notificationList.commentError)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className={twMerge('rounded-10 border border-noir-border p-4 md:p-6 bg-noir-card', className)}>
      <div className={'flex items-center gap-3 mb-4'}>
        <div className={'w-8 h-8 rounded-full overflow-hidden flex-shrink-0'}>
          {userImg ? (
            <img src={userImg} alt={userName} className={'w-full h-full object-cover'} />
          ) : (
            <AbsentImg className={'h-full'} />
          )}
        </div>
        <p className={'font-inter font-semibold text-sm text-text-base'}>{userName}</p>
      </div>

      <Editor key={editorKey} getContent={handleContentChange} initialContentState={''} />

      <div className={'flex justify-end mt-1 mb-3'}>
        <span className={twMerge('text-xs font-inter text-text-muted', charCount > MAX_CHARS && 'text-red-400')}>
          {charCount}/{MAX_CHARS}
        </span>
      </div>

      <div className={'flex justify-end'}>
        <Button
          variant={'primary'}
          size={'sm'}
          onClick={sendMessage}
          disabled={isSending || charCount === 0 || charCount > MAX_CHARS}
          className={'flex items-center gap-2'}
        >
          {isSending && <Spinner className={'w-4 h-4'} />}
          {isSending ? t('comment.sending') : t('comment.send')}
        </Button>
      </div>
    </div>
  )
}
