import { Link } from 'react-router-dom'
import { ReactComponent as EyeIcon } from '../../../assets/images/general/eye.svg'
import { ReactComponent as CommentIcon } from '../../../assets/images/general/comment.svg'
import { INews } from '../../../api/types'
import { getDate } from '../../../utils'

interface NewsItemProps extends INews {
  className?: string
}
export const NewsItem = ({ id, img, date, seen, comments, title, className }: NewsItemProps) => {
  return (
    <Link
      to={`/news/${id}`}
      className={`
        group/news relative bg-img rounded-10 overflow-hidden h-[245px]
        sm:h-[332px] sm:pl-[22px] sm:pr-12
        md:h-[289px]
        lg:h-[245px]
        xl:h-[332px]
        2xl:h-[414px]
        ${className}`}
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className={'group-hover/news:opacity-100 opacity-0 absolute inset-0 bg-news-gradient z-0'} />
      <div
        className={`absolute inset-0 p-4 pl-[22px] flex flex-col h-full z-20 sm:pr-12 md:py-[26px]
          md:pl-[18px] md:pr-[14px]`}
      >
        <p className={'flex-1 text-13 flex items-end text-gray-3'}>Новость</p>
        <div className={`flex items-center text-15 font-q-700 mt-1 mb-3.5 md:mb-3`}>
          <p>{getDate(date)}</p>
          <p className={'pl-4 pr-2.5 flex-center gap-1'}>
            <EyeIcon className={'w-[18px]'} />
            {seen}
          </p>
          <p className={'flex-center gap-1'}>
            <CommentIcon className={'w-[13.12px]'} /> {comments}
          </p>
        </div>
        <h4 className={'text-lg font-q-900 font-black'}>{title}</h4>
      </div>
    </Link>
  )
}
