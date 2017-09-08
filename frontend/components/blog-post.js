import Link from 'next/link'
import PostFooter from './post-footer'
import { indexOf } from 'lodash'

const PostPagination = ({ post, ids }) => {
  const postIndex = indexOf(ids, post.id)
  const prevId = ids[postIndex - 1]
  const nextId = ids[postIndex + 1]

  return (
    <div className="post-pagination">
      {prevId}
    </div>
  );
}

import { LinkContent, QuoteContent, StandardContent } from './post-content'

export default ({ post, ids }) => {
  const { postFormat, slug, title } = post;
  const classNames = `blog-post post post--${postFormat}`;
  let content, footer;

  if(postFormat == 'quote'){
    content = (
      <QuoteContent post={post} />
    )
  }
  else if(postFormat == 'link') {
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

      <PostPagination post={post} ids={ids} />

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