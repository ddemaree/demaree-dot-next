import { Component } from 'react'

import PageLayout from '../components/page-layout'
import BlogListing from '../components/blog-listing'
import BlogPost from '../components/blog-post'

import PostsApi from '../lib/posts-api'
const postsApi = PostsApi.getInstance();

const PostsWrapper = ({ children })=>{
  return (
    <div className="posts-wrapper">
      { children }
      <style jsx>{`
      .posts-wrapper {
        margin: 0 auto;
        max-width: 60em;
        padding: 1.25em;
      }
      @media (min-width: 600px) {
        .posts-wrapper {
          padding: 2.5em;
        }
      }
      `}</style>
    </div>
  )
}

// This could be DRYed out, but isn't hurting anyone
const PostsLayout = ({children}) => {
  return (
    <PageLayout section="posts">
      {children}
    </PageLayout>
  )
}

export default class extends Component {
  static async getInitialProps({query, req}){
    const page = query.page || 1;
    const limit = 10;
    const id = query.id || null;
    let action, getPosts;

    if(id) {
      action = 'show';
      getPosts = postsApi.getPostById(id);
    } else {
      action = 'index';
      getPosts = postsApi.getPosts({page, limit});
    }

    const [ids, response] = await Promise.all([
      postsApi.getEntryIds(),
      getPosts
    ]);

    return Object.assign({}, response, {action});
  }

  render() {
    const { posts, error, page, total_posts, total_pages, action, ids } = this.props;

    switch (action) {
      case 'show':
        const [ post ] = posts;
        return (
          <PostsLayout>
            <PostsWrapper>
              <BlogPost post={post} ids={ids} />
            </PostsWrapper>
          </PostsLayout>
        )
    
      default:
        return (
          <PostsLayout>
            <PostsWrapper>
              <BlogListing posts={posts} error={error} page={page} total_pages={total_pages} />
            </PostsWrapper>
          </PostsLayout>
        )
    }
  }
}