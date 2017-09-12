import { Component } from 'react'
import Head from 'next/head'

import PageLayout from '../components/page-layout'
import BlogListing from '../components/blog-listing'
import BlogPost from '../components/blog-post'

import PostsApi from '../lib/posts-api'
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

import Link from 'next/link'
const PostPaginationLink = ({post, direction = 'next', children}) => {
  if(!post) return null;

  return (
    <Link href={{pathname: '/posts', query: {id: post.id}}}>
      <a className={`pp-link pp-link--${direction}`}>
        <div>
          <div className="pp-link__label">{direction === "prev" ? "Newer" : "Older"}:</div>
          <div className="pp-link__title">{post.title}</div>
        </div>

        <style jsx>{`
        .pp-link {
          align-items: center;
          border: 0;
          display: flex;
          padding: 1em 0;
          flex: 0 0 50%;
          line-height: 1.125;

          font-family: 'halyard-micro';
          font-size: 0.625em;
        }

        .pp-link div {
          flex-grow: 1;
          margin: 0 20px;
        }

        .pp-link--prev {
          text-align: right;
          order: -1;
        }
        .pp-link--next {
          text-align: left;
          order: 1;
          border-left: 1px solid #999;
        }

        .pp-link--prev:before,
        .pp-link--next:after {
          color: rgba(0,0,0,0.1);
          display: block;
          font-size: 3em;
          width: 1.25em;
          flex-basis: 1.25em;
        }
        .pp-link--prev:before {
          content: '←';
        }
        .pp-link--next:after {
          content: '→';
        }

        .pp-link__label {
          text-transform: uppercase;
        }

        `}</style>
      </a>
    </Link>
  )
}

const PostPagination = ({post, current_index, total_posts}) => {
  const { prevPost, nextPost } = post;

  return (
    <div className="post-pagination">
      <PostPaginationLink post={prevPost} direction='prev' />
      <PostPaginationLink post={nextPost} direction='next' />

      <style jsx>{`
      .post-pagination {
        border: 1px solid rgba(0,0,0,0.3);
        border-width: 1px 0;
        display: flex;
        flex-wrap: wrap;
        margin: 2em 0 0;
        justify-content: space-between;
      }
      `}</style>
    </div>
  )
}

export default class extends Component {
  static async getInitialProps({query}){
    const page = query.page || 1;
    const limit = 10;
    const id = query.id || null;
    let action, fetchData;

    if(id) {
      action = 'show';
      fetchData = postsApi.getPostWithPrevAndNext(id);
    } else {
      action = 'index';
      fetchData = Promise.all([
        postsApi.getEntryIds(),
        postsApi.getPosts({page, limit})
      ])
      .then(([ids, response])=>{
        return Object.assign({}, response, {ids})
      });
    }

    // const ids = [];
    const response = await fetchData;

    return Object.assign({}, response, { action });
  }

  render() {
    const { posts, error, page, total_posts, total_pages, action, ids } = this.props;

    switch (action) {
      case 'show':
        const [ post ] = posts;
        return (
          <PageLayout section="posts">
            <Head>
              <title>POST TITLE HERE</title>
            </Head>
            <PostsWrapper>
              <BlogPost post={post} ids={ids} />
              <PostPagination {...this.props} post={post} />
            </PostsWrapper>
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