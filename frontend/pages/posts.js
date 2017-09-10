import React from 'react'
import PageLayout from '../components/page-layout'

import BlogListing from '../components/blog-listing'
import BlogPost from '../components/blog-post'

import { createClient } from 'contentful'
import moment from 'moment'
import Link from 'next/link'

import PostsApi from '../components/posts-api'
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

class PostsIndex extends React.Component {
  static async getInitialProps({query, req}){
    const page = query.page || 1;
    const limit = 10;
    const id = query.id || null;

    const [ids, response] = await Promise.all([
      postsApi.getEntryIds(),
      postsApi.getPosts({page, limit})
    ]);

    return Object.assign({}, response, {ids});
  }

  render() {
    const { posts, error, page, total_posts, total_pages, action, ids } = this.props;

    switch (action) {
      case 'show':
        const [ post ] = posts;
        return (
          <PageLayout section="posts">
            <BlogPost post={post} ids={ids} />
          </PageLayout>
        )
    
      default:
        return (
          <PageLayout section="posts">
            <PostsWrapper>
              <BlogListing posts={posts} error={error} page={page} total_pages={total_pages} />
            </PostsWrapper>
          </PageLayout>
        )
    }
  }
}

export default PostsIndex;