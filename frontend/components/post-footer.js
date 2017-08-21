import moment from 'moment'
import Link from 'next/link'

export default ({ post }) => {
  let date = moment(post.date);
  let formattedDate = date.format('MMMM D, YYYY');
  let dateTime = date.toISOString();

  return (
    <div className="post__footer">
      <time className="post__date_gmt">
        <span>Posted </span>
        <Link href={{pathname: "/posts/show", query: {id: post.slug}}}>
          <a>{ formattedDate }</a>
        </Link>
      </time>

      <style jsx>{`
      .post__footer {
        color: #ccc;
      }
      time {
        font-weight: 600;
      }  
      `}</style>
    </div>
  )
};