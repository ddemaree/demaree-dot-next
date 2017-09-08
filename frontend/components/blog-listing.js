import BlogPost from './blog-post'
import Link from 'next/link'
import moment from 'moment'
import { groupBy, forEach } from 'lodash'

const PostIndexHeader = ({title, format}) => {
  const displayTitle = title || "No title";

  switch (format) {
    case 'link':
      return (
        <h2 dangerouslySetInnerHTML={{__html: displayTitle}} />
      )
  
    default:
      return (
        <h2 dangerouslySetInnerHTML={{__html: displayTitle}} />
      )
  }
}

const PostIndexDateline = ({date}) => {
  const yearAgo = moment().subtract(1, 'year');
  const publishMoment = moment(date);
  const displayDate = publishMoment.isBefore(yearAgo) ? 
                      publishMoment.format('MMM D, YYYY') : 
                      publishMoment.fromNow();

  return (
    <time datetime={publishMoment.toISOString()}>
      Published {displayDate}
    </time>
  )
}

const BlogPostRow = ({post}) => {
  const { id, title, postFormat, date, slug } = post;

  return (
    <article className={`archive-${postFormat}`}>
      <Link href={{pathname: '/posts', query: {id}}}>
        <a>
          <PostIndexHeader title={title} format={postFormat} />
          <PostIndexDateline date={date} />
        </a>
      </Link>
    </article>
  )
}

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
      <PageLink page={_page + 1} disabled={!!((_page + 1) > _total_pages)}>Older posts &rarr;</PageLink>
    </div>
  )
}

// This component just renders the archive view
const BlogListing = (props) => {
  const { posts, error, page, total_pages } = props;

  let errorTag;
  if(error) {
    console.log(error);
    errorTag = (
      <div className="error-msg">THERE WAS AN ERROR { error.message }</div>
    );
  }

  // const groupedPosts = groupBy(posts, post => moment(post.publish_date).startOf('month'))

  return (
    <div className="blog-posts">
      {errorTag}
      {
        posts.map(post => (
          <BlogPostRow post={post} key={`index-post-${post.id}`} />
        ))
      }
      <PostsIndexPagination page={page} total_pages={total_pages}  />
    </div>
  );
}

export default BlogListing;