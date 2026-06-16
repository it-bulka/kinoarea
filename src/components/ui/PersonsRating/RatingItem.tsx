interface RatingItemProps {
  img: string
  rate: string | number
  actor: string
  originalActorName: string
  age: number
}
export const RatingItem = ({ rate, age, actor, originalActorName }: RatingItemProps) => {
  return (
    <li className={'flex justify-between items-center py-2'}>
      <div>
        <p className={'text-15 font-inter font-bold text-text-base'}>{actor}</p>
        <p className={'text-11 mb-[1.79px] mt-[3px] text-text-muted'}>{originalActorName}</p>
        <p className={'text-11 text-gold-light'}>{age} лет</p>
      </div>
      <p className={'text-15 text-gold-light font-inter font-semibold'}>{rate} место</p>
    </li>
  )
}
