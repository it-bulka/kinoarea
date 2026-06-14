import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, TypographyTypes } from '../../components/ui/Typography/Typography'
import { Breadcrumbs } from '../../components/ui/Breadcrumbs/Breadcrumbs'
import { NewsSlider } from '../../components/ui/sliders/NewsSlider/NewsSlider'
import { FirebaseApi } from '../../api/firebase'
import { INews } from '../../api/types'

const classes = {
  img: 'w-full max-h-[80vh] object-cover rounded-10',
}

const PBlock = ({ list }: { list: string[] }) => (
  <div>
    {list.map((p, i) => (
      <Typography className={'[&:not(:last-of-type)]:pb-2'} key={i}>
        {p}
      </Typography>
    ))}
  </div>
)

export const OneNews = () => {
  const { slug } = useParams()
  const [article, setArticle] = useState<INews | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    FirebaseApi.getNewsItem(slug).then(item => {
      setArticle(item)
      setIsLoading(false)
    })
  }, [slug])

  if (isLoading) {
    return <div className={'container py-16 text-center text-white/60'}>Загрузка...</div>
  }

  if (!article) {
    return <div className={'container py-16 text-center text-white/60'}>Новость не найдена</div>
  }

  const paragraphs = article.content ?? [article.details]

  return (
    <div className={'container'}>
      <section>
        <Typography variant={'h1'} type={TypographyTypes._TITLE}>
          {article.title}
        </Typography>
        <Breadcrumbs lastCrumb={article.title} className={'py-[9px]'} />
      </section>

      <section>
        <img src={article.img} alt={article.title} className={`aspect-[367/267] mt-5 mb-3.5 ${classes.img}`} />
        <PBlock list={paragraphs} />
      </section>

      {article.images && article.images.length > 0 && (
        <section className={'mt-8 mb-16 md:mt-10 md:mb-15 lg:mb-[42px] 2xl:my-9'}>
          <NewsSlider slides={article.images} />
        </section>
      )}
    </div>
  )
}
