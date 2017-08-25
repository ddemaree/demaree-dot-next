import Link from 'next/link'
import PostHeader from './post-header'
import PostFooter from './post-footer'

export default ({ post, context = 'index' }) => {
  let { format, slug, title } = post;
  let classNames = `blog-post post post--${format}`;
  let content;

  let parts = post.content.split(/(?:<p>)<!--more-->(?:<\/p>)/);
  let display_content, jump_link;
  
  if(context == 'index') {
    display_content = parts[0];

    if (parts.count > 1) {
      jump_link = (
        <p className="read-more" name="name">
          <Link href={{pathname: "/posts/show", query: {id: slug}, hash: "more"}}>
            <a>Read more &rarr;</a>
          </Link>
        </p>
      )
    }
  } else {
    display_content = parts.join("\n");
  }

  if(format == 'quote'){
    content = (
      <div className="quote-body">
        <div className="post-content" dangerouslySetInnerHTML={{__html: display_content}} />

        <style jsx>{`
          .post-content :global(blockquote) {
            font-size: 1.75em;
            line-height: 1.25;
            font-weight: 300;
            border: none;
            letter-spacing: -0.5px;
            border-radius: 0.25em;
            margin: 0 0 0.25em;
            padding: 0 1em;
            color: #000;
          }

          .post-content:before {
            content: '“';
            display: block;
            position: absolute;
            font-size: 3em;
            line-height: 0.5em;
            margin-top: 0.25em;
            color: #ccc;
          }

          .quote-body :global(blockquote + p),
          .post-content :global(.quote-source) {
            padding-left: 1.75em;
          }
        `}</style>
      </div>
      
    );
  }
  else if(format == 'link') {
    content = (
      <div>
        <h2 className="link-header">
          <a className="external" rel="external" href={post.link_url}>{title}</a>
        </h2>
        <div className="post-content" dangerouslySetInnerHTML={{__html: display_content}} />
        <style jsx global>{`
        .link-header {
          font-size: inherit;  
        }
        .link-header .external:after {
          content: '→';
        }
        `}</style>
      </div>
    )
  }
  else {
    content = (
      <div>
        <PostHeader slug={slug} title={title} />
        <div className="post-content" dangerouslySetInnerHTML={{__html: display_content}} />
        {jump_link}
      </div>
    );
  }

  return (
    <div className={classNames}>
      <PostFooter post={post} />

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

        blockquote *:first-child {
          margin-top: 0;
        }
        blockquote *:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
};