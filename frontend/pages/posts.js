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

const PostsLayout = ({children}) => {
  return (
    <PageLayout section="posts">
      {children}
    </PageLayout>
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

    return Object.assign({}, response);
  }

  componentDidMount() {
    // Ok, Next does a good job of passing props to the client as the __NEXT_DATA__ property. If I need to move any data into the client-side instance of the PostsAPI object, I can do so here. 
    // Note that componentDidMount will only be called once for this page, on its initial load
    console.log("> Posts page did mount")
    if(!window.__DD_POSTS_LOADED__) {
      console.log("First load, should rehydrate from __NEXT_DATA__")
      window.__DD_POSTS_LOADED__ = true;
    } else {
      console.log("Subsequent load")
    }
    // console.log(window.__NEXT_DATA__);
    // console.log(window.__DD_POSTS_API__);
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

export default PostsIndex;