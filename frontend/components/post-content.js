const LinkContent = ({ post }) => {
  const { format, slug, title, content, link_url } = post;

  return (
    <div>
      <h2 className="post--link__header link-header">
        <a className="external" rel="external" href={link_url}>{title}</a>
      </h2>
      <div className="post-content post__content" 
           dangerouslySetInnerHTML={{__html: content}} />

      <style jsx>{`
      .link-header {
        font-size: inherit;  
      }
      .link-header .external:after {
        content: ' →';
      }
      `}</style>
    </div>
  )
}

const QuoteContent = ({ post }) => {
  const { format, slug, title, content, link_url } = post;

  return (
    <div className="quote-body">
      <div className="post-content"
           dangerouslySetInnerHTML={{__html: content}} />

      <style jsx>{`
        .post-content :global(blockquote) {
          border: none;
          letter-spacing: -0.5px;
          border-radius: 0.25em;
          margin: 0 0 0.25em;
          padding: 0 1em;
          color: #000;
        }

        .post-content :global(blockquote:before) {
          content: '“';
          display: block;
          position: absolute;
          font-size: 1.75em;
          line-height: 0.5em;
          margin-top: 0.25em;
          color: #ccc;
          margin-left: -0.625em;
        }

        .quote-body :global(blockquote + p),
        .post-content :global(.quote-source) {
          padding-left: 1.75em;
        }
      `}</style>
    </div>
  )
}

import PostHeader from './post-header'

const StandardContent = ({ post, context = 'index' }) => {
  const { format, slug, title, content } = post;
  const parts = content.split(/(?:<p>)<!--more-->(?:<\/p>)/);
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

  return (
    <div>
      <PostHeader slug={slug} title={title} />
      <div className="post-content" dangerouslySetInnerHTML={{__html: display_content}} />
      {jump_link}
    </div>
  )
}

export { LinkContent, QuoteContent, StandardContent };