import moment from 'moment'
import Link from 'next/link'

export default ({ post }) => {
  let date = moment(post.date);
  let formattedDate = date.format('MMMM D, YYYY');
  let dateTime = date.toISOString();

  return (
    <div className="post__footer">
      <time className="post__date_gmt">
        <Link href={{pathname: "/posts", query: {id: post.slug}}} as={`/posts/2017/${post.slug}`}>
          <a>{ formattedDate }</a>
        </Link>
      </time>

      <style jsx>{`
      .post__footer {
        color: #999;
        font-size: 0.75em;
        margin-bottom: 1em;
        text-transform: uppercase;
        font-family: 'halyard-micro';
      }
      .post__footer a {
        border: 0;
      }
      time {
        font-weight: 600;
      }
      .permalink {
        color: #c60;
      }
      `}</style>
    </div>
  )
};