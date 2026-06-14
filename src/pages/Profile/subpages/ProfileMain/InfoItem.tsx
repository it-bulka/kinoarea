import { Link } from 'react-router-dom'

export interface InfoItemProps {
  amount: number
  title: string
  to?: string
}

export const InfoItem = ({ amount, title, to }: InfoItemProps) => {
  const inner = (
    <>
      <p>{amount}</p>
      <p className={'w-min lg:w-auto'}>{title}</p>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={'text-[#323A55] px-1 hover:text-blue transition-colors'}>
        {inner}
      </Link>
    )
  }

  return <div className={'text-[#323A55] px-1'}>{inner}</div>
}
