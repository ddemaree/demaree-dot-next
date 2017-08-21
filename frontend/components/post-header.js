import Link from 'next/link'

export default ({slug, title}) => (
  <h1 className="post__header">
    <Link href={{pathname: "/posts/show", query: {id: slug}}}>
      <a dangerouslySetInnerHTML={{__html: title}} />
    </Link>
  </h1>
);