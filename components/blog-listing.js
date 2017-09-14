import BlogPost from './blog-post'
import Link from 'next/link'
import moment from 'moment'
// import { groupBy, forEach } from 'lodash'

const PageLink = ({ children, page, disabled = false, pathname = "/posts" })=> {
  if(page < 1 || disabled){
    return null;
  } else {
    return (
      <Link href={{pathname, query: {page}}}>
        <a className="page-link">{children}</a>
      </Link>
    )
  }
}

const PostsIndexPagination = ({ page, total_pages }) => {
  const _page = parseInt(page)
  const _total_pages = parseInt(total_pages)

  if(_total_pages <= 1) return null;

  return (
    <div className="pagination">
      <PageLink page={_page - 1}>&larr; Newer posts</PageLink>
      <div />
      <PageLink page={_page + 1} disabled={!!((_page + 1) > _total_pages)}>Older posts &rarr;</PageLink>

      <style jsx>{`
      .pagination {
        border-top: 2px solid black;
        padding: 1em 0;
        display: flex;
      }
      .pagination > div {
        flex: 1;
      }
      `}</style>
    </div>
  )
}

// This component just renders the archive view
const BlogListing = (props) => {
  const { posts, error, page, total_pages } = props;

  return (
    <div className="blog-posts">
      <h1>Archives</h1>
      {
        posts.map(post => (
          <BlogPost post={post} index={true} key={`index-post-${post.id}`} />
        ))
      }
      <PostsIndexPagination page={page} total_pages={total_pages}  />

      <style jsx>{`
      h1 {
        margin-top: 0;
        margin-bottom: 1em;
      }
      .blog-posts > :global(article) {
        padding: 1.5em 0 3em;
        border-top: 1px solid #e5e5e5;
      }
      
      `}</style>
    </div>
  );
}

export default BlogListing;