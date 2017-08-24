import React from 'react'
import Head from 'next/head'
import PostsAPI from 'components/posts-api'
import BlogPost from 'components/blog-post'
import PageLayout from 'components/page-layout'

export default class extends React.Component {
  static async getInitialProps({req}){
    return await PostsAPI.getPosts({page: 1, per_page: 10});
  }
  
  render() {
    let errorTag;
    let { posts, error } = this.props;
    let postTags = posts.map(post => { return (
      <BlogPost post={post} key={`index-post-${post.slug}`} />
    ) })

    if(error) {
      console.log(error);
      errorTag = (
        <div className="error-msg">THERE WAS AN ERROR { error.message }</div>
      );
    }

    return (
      <PageLayout>
        {errorTag}
        {postTags}
      </PageLayout>
    )
  }
}
