import Link from 'next/link'

export default ({slug, title}) => (
  <h1 className="post__header">
    <Link href={{pathname: "/posts/show", query: {id: slug}}}>
      <a dangerouslySetInnerHTML={{__html: title}} />
    </Link>
    <style jsx>{`
      .post__header {
        font-weight: 300;
        font-size: 2em;
      }
      a {
        border: 0;
      }
    `}</style>
  </h1>
);