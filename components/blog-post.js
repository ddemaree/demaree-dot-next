import Link from 'next/link'
import moment from 'moment'
import { kebabCase } from 'lodash'

import MarkdownContent from './markdown-content'

const PostDateline = ({ post }) => {
  let date = moment(post.date);
  let formattedDate = date.format('MMM D, YYYY');
  let dateTime = date.toISOString();

  return (
    <time dateTime={dateTime} className="post__date">
      <Link href={{pathname: "/posts", query: {id: post.id}}}>
        <a>{ formattedDate }</a>
      </Link>
      <style jsx>{`
      time {
        color: #999;
        display: block;
        font-weight: 600;
        text-transform: uppercase;
      }
      time a {
        border: 0;
      }
      `}</style>
    </time>
  )
};

const deOrphanify = (string) => {
  const parts = string.split(' ');
  if(parts.length <= 2) return string;

  return string;
}

const PostHeader = ({slug, title, id}) => (
  <h2 className="phdr phdr--standard">
    <span dangerouslySetInnerHTML={{__html: title}} />
    <style jsx>{`
      h2 {
        font-weight: 300;
        font-size: 2em;
        line-height: 1.1;
        font-family: 'halyard-display';
        margin-bottom: 0.375em;
      }
      a:link, a:visited, a {
        border: 0;
      }
    `}</style>
  </h2>
);

const LinkHeader = ({title, linkUrl}) => {
  if(!linkUrl) return null;

  return (
    <h2 className="phdr phdr--link">
      <a href={linkUrl} dangerouslySetInnerHTML={{__html: title}} />
      <style jsx>{`
      h2 {
        line-height: inherit;
        margin-bottom: 1em;
      }

      a:after {
        content: '\00A0→';
        display: inline;
      }
      `}</style>
    </h2>
  )
}

const getHeaderForPost = (post)=>{
  const { postFormat } = post;
  if(postFormat === 'quote') return null;
  
  return <header>
    {
      postFormat === 'link' ? 
      <LinkHeader title={post.title} linkUrl={post.linkUrl} /> : 
      <PostHeader title={post.title} slug={post.slug} id={post.id} />
    }
    <style jsx>{`
    header :global(h2) {
      margin-top: 0;
    }
    `}</style>
  </header>
}

const TagLink = ({tag}) => {
  const tagEncoded = encodeURIComponent(tag);

  return (
    <Link href={{pathname: '/posts', query: {tag: tagEncoded}}}>
      <a className="post-tag">#{tag}</a>
    </Link>
  )
}

const TagsList = ({tags}) => {
  if(tags.length === 0) return null;

  return (
    <div className="post__tags">
      { tags.map(tag => <TagLink tag={tag} key={`post-tag-${tag}`} />) }
      <style jsx>{`
      .post__tags {
        font-size: 0.8em;
        margin-top: 2em;
      }
      
      .post__tags :global(a) {
        border: 0;
        color: #c3c;
        margin-right: 1em;
        text-transform: uppercase;
      }  
      `}</style>
    </div>
  )
}

export default ({ post }) => {
  const { postFormat, slug, title, id, body, tags = [] } = post;
  const classNames = `post post--${postFormat}`;

  return (
    <article className={classNames}>
      <header className="post__header">
        <PostDateline post={post} />
      </header>
      <div className="post__body">
        { getHeaderForPost(post) }
        <MarkdownContent classNames={['post__content', 'post-content']} content={body} />
        <TagsList tags={tags} />
        {/*  */}
      </div>

      <style jsx>{`
        article {
          display: flex;
          flex-wrap: wrap;
        }
        .post__header {
          white-space: nowrap;
          margin-right: 40px;
          width: 6em;
          margin-bottom: 1em;
          font-size: 0.8em;
          font-family: 'halyard-micro', sans-serif;
        }
        .post__body {
          {/* max-width: 38em; */}
          flex: 1;
          flex-basis: 28em;
        }
        .post__body > :global(div > *:first-child) {
          margin-top: 0;
        }

        .post--quote :global(.post__content > *) {
          margin-left: 2rem;
        }
        .post--quote :global(.post__content > blockquote) {
          font-size: 1.25em;
          padding: 0;
          border: 0;
        }
        .post--quote :global(.post__content > blockquote:after) {
          content: '';
          width: 10%;
          display: block;
          border-bottom: 4px solid #000;
          margin-bottom: 1em;
        }
        .post--quote :global(.post__content:before) {
          content: '“';
          display: block;
          position: absolute;
          font-size: 3rem;
          line-height: 2rem;
          margin-top: 0.25rem;
          opacity: 0.3;
        }


      `}</style>

    </article>
  )
};