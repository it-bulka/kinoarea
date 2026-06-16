import { INews } from '../../../api/types'
import { Link } from 'react-router-dom'
import { getDate } from '../../../utils'
import { ReactComponent as EyeIcon } from '../../../assets/images/general/eye.svg'
import { ReactComponent as CommentIcon } from '../../../assets/images/general/comment.svg'

interface NewsBigCardProps extends INews {
  className?: string
}
export const NewsBigCard = ({ id, title, date, seen, comments, details, img, className }: NewsBigCardProps) => {
  return (
    <div
      className={`${className} px-6 py-5 flex flex-col justify-between bg-img rounded-10 aspect-[368/245]
        md:aspect-[7/3]
        lg:pl-[23px] lg:pr-[87px] lg:py-[38px]
        2xl:pr-[87px] 2xl:pl-[221px] 2xl:pt-[52px] 2xl:pb-14 2xl:aspect-[5/3] `}
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className={'flex items-center text-xs font-inter font-bold md:text-15'}>
        <p>{getDate(date)}</p>
        <p className={'pl-1.5 pr-2.5 flex-center gap-1'}>
          <EyeIcon className={'w-17 h-17'} />
          {seen}
        </p>
        <p className={'flex-center gap-1'}>
          <CommentIcon className={'w-17 h-17'} /> {comments}
        </p>
      </div>
      <div>
        <p className={'text-lg/[20px] font-playfair font-bold mb-5 md:text-3xl lg:text-4xl 2xl:text-[45px]'}>
          <Link to={`/news/${id}`}>{title}</Link>
        </p>
        <p className={'hidden md:block'}>{details}</p>
      </div>
    </div>
  )
}
