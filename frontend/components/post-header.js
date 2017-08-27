import Link from 'next/link'

export default ({slug, title}) => (
  <h1 className="post__header">
    <Link href={{pathname: "/posts/show", query: {id: slug}}}>
      <a dangerouslySetInnerHTML={{__html: title}} />
    </Link>
    <style jsx>{`
      .post__header {
        font-weight: 300;
        font-size: 2.25em;
        line-height: 1.1;
        font-family: 'halyard-display';
      }
      a:link, a:visited, a {
        border: 0;
      }
    `}</style>
  </h1>
);