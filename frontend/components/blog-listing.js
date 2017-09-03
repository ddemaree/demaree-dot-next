import BlogPost from './blog-post'
import Link from 'next/link'

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

const BlogListing = (props, context) => {
  const { posts, error } = props;
  let { page, total_pages } = props;
  console.log(context)

  page = parseInt(page)
  total_pages = parseInt(total_pages)

  let errorTag, pagination;
  const postTags = posts.map(post => (
    <BlogPost context={context} post={post} key={`index-post-${post.slug}`} />
  ));

  if(error) {
    console.log(error);
    errorTag = (
      <div className="error-msg">THERE WAS AN ERROR { error.message }</div>
    );
  }

  if(total_pages > 1) {
    pagination = (
      <div className="pagination">
        <PageLink page={page - 1}>&larr; Newer posts</PageLink>
        <PageLink page={page + 1} disabled={!!((page + 1) > total_pages)}>Older posts &rarr;</PageLink>
      </div>
    )
  }

  return (
    <div className="blog-posts">
      {errorTag}
      {postTags}
      {pagination}
    </div>
  );
}

import PropTypes from 'prop-types'
BlogListing.contextTypes = {
  context: PropTypes.string
}

export default BlogListing;