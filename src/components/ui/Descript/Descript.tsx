export interface DescriptProps {
  title: string
  descriptions: string[] | string
}
export const Descript = ({ descriptions, title }: DescriptProps) => {
  const type = Array.isArray(descriptions)
  const style = {
    item: 'border-solid border-b-2 border-b-gold [&:not(:last-of-type)]:mr-2',
  }
  return (
    <li
      className={'flex text-xs text-start items-start md:text-13 lg:text-base 2xl:text-lg [&:not(:last-of-type)]:mb-2'}
    >
      <p className={'basis-1/3 sm:basis-1/5 shrink-0 pr-1 text-text-base/90 font-inter font-semibold md:basis-1/3'}>
        {title}:
      </p>
      <p className={'text-gold-light'}>
        {type ? (
          descriptions.map((item, order) => (
            <span className={style.item} key={order}>
              {item}
              {order !== descriptions.length - 1 ? ', ' : ''}
            </span>
          ))
        ) : (
          <span className={style.item}>{descriptions}</span>
        )}
      </p>
    </li>
  )
}
