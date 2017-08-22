import Link from 'next/link'
import PostHeader from './post-header'
import PostFooter from './post-footer'

export default ({post}) => {
  let { format, slug, title } = post;
  let classNames = `blog-post post post--${format}`;
  let content;
  
  if(format == 'quote'){
    content = (
      <div>
        <div className="post-content" dangerouslySetInnerHTML={{__html: post.content}} />
        <PostFooter post={post} />
      </div>
    );
  } else {
    content = (
      <div>
        <PostHeader slug={slug} title={title} />
        <PostFooter post={post} />
        <div className="post-content" dangerouslySetInnerHTML={{__html: post.content}} />
      </div>
    );
  }

  return (
    <div className={classNames}>
      {content}      
      <style jsx>{`
      .blog-post {
        margin: 2em 0;
        border-bottom: 1px solid #0003;
        padding-bottom: 2em;
      }

      .blog-post:first-child {
        margin-top: 0;
      }

      .blog-post:last-child {
        margin-bottom: 0;
      }

      .post__header {
        font-size: 1.5em;
        margin: 0;
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
      `}</style>
    </div>
  )
};