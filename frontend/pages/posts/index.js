import React from 'react'
import PostsAPI from 'components/posts-api'
import PageLayout from 'components/page-layout'
import BlogListing from 'components/blog-listing'

const postsApi = PostsAPI.getInstance();

export default class extends React.Component {
  static async getInitialProps({query, req}){
    // console.log(postsApi);
    const page = query.page || 1;
    const slug = query.id || null;

    if(slug) {
      console.log("> Rendering /posts?id - Need to show single page layout")
    }

    return await postsApi.getPosts({
      page
    });
  }
  
  render() {
    let { posts, error, page, total_posts, total_pages } = this.props;

    return (
      <PageLayout section="posts">
        <BlogListing posts={posts} error={error} page={page} total_pages={total_pages} />
      </PageLayout>
    )
  }
}
