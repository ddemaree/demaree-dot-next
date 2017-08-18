import React from 'react'
import PostsAPI from '../../components/posts-api'
import BlogPost from '../../components/blog-post'

export default class extends React.Component {
  static async getInitialProps({query, req}){
    let page = query.page || 1;
    return await PostsAPI.getPosts({
      page
    });
  }
  
  render() {
    console.log(this.props);
    let { posts } = this.props;
    let postTags = posts.map(post => { return (
      <BlogPost post={post} />
    ) })

    return (
      <div>
        <h1>This is David's ridiculous website.</h1>
        <p>
          Showing 10 of {this.props.totalPosts} posts
        </p>
        {postTags}
      </div>
    )
  }
}