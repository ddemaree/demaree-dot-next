import Link from 'next/link'
import PostFooter from './post-footer'

const PostPagination = ({ post }) => {
  const { previous_post, next_post } = post;

  return (
    <div className="post-pagination">
      POST PAGINATION
    </div>
  );
}

import { LinkContent, QuoteContent, StandardContent } from './post-content'

export default ({ post }) => {
  const { format, slug, title } = post;
  const classNames = `blog-post post post--${format}`;
  let content, footer;

  if(format == 'quote'){
    content = (
      <QuoteContent post={post} />
    )
  }
  else if(format == 'link') {
    content = (
      <LinkContent post={post} />
    )
  }
  else {
    content = (
      <StandardContent post={post} />
    )
  }

  return (
    <article className={classNames}>
      <PostFooter post={post} />

      {content}

      <PostPagination post={post} />

      <style jsx>{`
      article {
        margin: 0 auto;
        max-width: 42em;
        padding: 2.5em;
      }
      article.post--index {
        padding-bottom: 0;
      }
      @media (max-width: 700px) {
        article {
          padding: 2.5em 1.5em;
        }
      }
      `}</style>

      {/* These styles must be globaled because one can't predict the JSX ID of the containing element */}
      <style jsx global>{`
        .post-content blockquote {
          border-left: 4px solid #eee;
          padding: 0 1.5em;
          margin: 1em 0;
          color: #666;
        }

        blockquote *:first-child {
          margin-top: 0;
        }
        blockquote *:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </article>
  )
};