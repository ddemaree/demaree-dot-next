import React from 'react'
import Head from 'next/head'
import PostsAPI from '../../components/posts-api';
import BlogPost from '../../components/blog-post';

import PageLayout from 'components/page-layout'

export default class extends React.Component {
  static async getInitialProps({query, req}){
    let id = query.id;
    return await PostsAPI.getPostBySlug(id);
  }

  render() {
    let { post, slug, thisPost } = this.props;

    return (
      <PageLayout title={thisPost.title}>
        <BlogPost post={thisPost} />
      </PageLayout>
    )
  }
}
