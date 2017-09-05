import React from 'react'
import PostsAPI from 'components/posts-api'
import PageLayout from 'components/page-layout'

import BlogListing from 'components/blog-listing'
import BlogPost from 'components/blog-post'

import PropTypes from 'prop-types'

const postsApi = PostsAPI.getInstance();

class PostsIndex extends React.Component {
  static async getInitialProps({query, req}){
    const page = query.page || 1;
    const slug = query.id || null;
    let postData, context = 'index', action = 'index';

    if(slug) {
      postData = await postsApi.getPostBySlug(slug);
      action = 'show';
    } else {
      postData = await postsApi.getPosts({
        page
      });
    }

    return Object.assign({}, postData, { context, action });
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, query } = nextProps.url
    // fetch data based on the new query
    // console.log("RECEIVED PROPS");
  }

  render() {
    const { posts, error, page, total_posts, total_pages, action } = this.props;

    switch (action) {
      case 'show':
        const [ post ] = posts;
        return (
          <PageLayout section="posts">
            <BlogPost post={post} />
          </PageLayout>
        )
    
      default:
        return (
          <PageLayout section="posts">
            <h1>Archives</h1>
            <BlogListing posts={posts} error={error} page={page} total_pages={total_pages} />
          </PageLayout>
        )
    }
  }
}

export default PostsIndex;