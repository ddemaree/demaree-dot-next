import React from 'react'
import Head from 'next/head'
import PostsAPI from 'components/posts-api'
import PageLayout from 'components/page-layout'
import BlogListing from 'components/blog-listing'

export default class extends React.Component {
  static async getInitialProps({query, req}){
    let page = query.page || 1;
    return await PostsAPI.getPosts({
      page
    });
  }
  
  render() {
    let { posts, error, page, total_posts, total_pages } = this.props;

    return (
      <PageLayout>
        <BlogListing posts={posts} error={error} page={page} total_pages={total_pages} />
      </PageLayout>
    )
  }
}
