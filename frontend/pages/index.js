import React from 'react'
import Head from 'next/head'
import PostsAPI from 'components/posts-api'
import BlogPost from 'components/blog-post'
import PageLayout from 'components/page-layout'

export default class extends React.Component {
  static async getInitialProps({req}){
    return await PostsAPI.getPosts({page: 1, per_page: 5});
  }
  
  render() {
    let { posts } = this.props;
    let postTags = posts.map(post => { return (
      <BlogPost post={post} key={`index-post-${post.slug}`} />
    ) })

    return (
      <PageLayout>
        {postTags}
      </PageLayout>
    )
  }
}
