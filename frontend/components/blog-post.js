import Link from 'next/link'

export default ({post}) => (
  <div className="blog-post">
    <h1>
      <Link href={{pathname: "/posts", query: {id: post.slug}}}>
        <a dangerouslySetInnerHTML={{__html: post.title}} />
      </Link>
    </h1>

    <div className="post-content" dangerouslySetInnerHTML={{__html: post.content}} />
  </div>
)