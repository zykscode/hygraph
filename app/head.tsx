import HeadMeta from "#/components/HeadMeta";

type Props = {
  title:string
  description:string
  content?:string
  date:string
  image:string
}

export default function Head({title,description,content,date,image}:Props) {
  return (
    <>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={description} />
      <meta property="og:url" content={`https://zykblog.com`} />
        <link rel="canonical" href={`https://zykblog.com`} />
        <meta property="og:type" content={''} />
        <meta property="og:site_name" content="Zykson" />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@zykson" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        {date && (
          <meta property="article:published_time" content={date} />
        )}
      <link rel="icon" href="/favicon.ico" />
      <HeadMeta/>
    </>
  )
}
