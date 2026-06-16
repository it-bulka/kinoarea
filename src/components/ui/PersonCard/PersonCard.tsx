interface PersonCardProps {
  img: string
  rate: string | number
  actor: string
  originalActorName: string
  age: number
}
export const PersonCard = ({ img, rate, actor, originalActorName, age }: PersonCardProps) => {
  return (
    <div
      className={`aspect-[1/1] bg-img rounded-[10px] flex flex-col pt-1.5 pb-3 px-2 
        md:pt-[9px] md:pb-[23px] md:px-[13px]
        lg:pt-[7px] lg:px-2.5 lg:pb-5`}
      style={{ backgroundImage: `url(${img})` }}
    >
      <p className={'flex-1 text-xs text-gold-light font-inter font-medium'}>{rate}-e место</p>
      <h5 className={'text-sm font-inter font-bold md:text-xl'}>{actor}</h5>
      <p
        className={`text-sm font-inter font-semibold text-xs text-text-base/35 my-[3.9%]
          md:text-sm md:mt-1.5 md:mb-[7.35px]
          lg:mb-[5px]`}
      >
        {originalActorName}
      </p>
      <p className={'text-xs text-gold-light font-inter font-medium'}>{age} лет</p>
    </div>
  )
}
