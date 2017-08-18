import React from 'react'
import Head from 'next/head'
import PostsAPI from '../components/posts-api'
import BlogPost from '../components/blog-post'

let stylesheet = require('styles/main.css')
// import stylesheet from 'styles/main.css'

export default class extends React.Component {
  static async getInitialProps({req}){
    return await PostsAPI.getPosts({page: 1, per_page: 5});
  }
  
  render() {
    let { posts } = this.props;
    let postTags = posts.map(post => { return (
      <BlogPost post={post} key={post.slug} />
    ) })

    return (
      <div>
        <Head>
          <title>I AM HIGH AS A KITE</title>
          <style dangerouslySetInnerHTML={{__html: stylesheet}} />
        </Head>
        <h1>This is David's ridiculous website.</h1>
        {postTags}
      </div>
    )
  }
}
