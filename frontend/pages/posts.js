import React from 'react'
import PageLayout from 'components/page-layout'

import BlogListing from 'components/blog-listing'
import BlogPost from 'components/blog-post'

import PropTypes from 'prop-types'
import { createClient } from 'contentful'
import moment from 'moment'
import Link from 'next/link'

import formatPost from 'components/format-post'

const contentful = createClient({
  space: process.env.CFUL_SPACE_ID,
  accessToken: process.env.CFUL_ACCESS_TOKEN
});

// const getEntries = (params)=>{
//   return Promise.all([
//     contentful.getEntries({
//       content_type: '2wKn6yEnZewu2SCCkus4as',
//       order: "-fields.date",
//       select: 'sys.id,fields.date,fields.title',
//       limit: 1000
//     }),
//     contentful.getEntries(params)
//   ])
//   .then(([ids_response, items_response])=>{
    
//   })
// }

const getEntryIds = () => {
  return contentful.getEntries({
      content_type: '2wKn6yEnZewu2SCCkus4as',
      order: "-fields.date",
      select: 'sys.id,fields.date,fields.title',
      limit: 1000
    })
    .then((idsResponse) => {
      return idsResponse.items.map(item => item.sys.id)
    })
}

class PostsIndex extends React.Component {
  static async getInitialProps({query, req}){
    const page = query.page || 1;
    const page_size = 10;
    const slug = query.id || null;

    const ids = await getEntryIds();

    const baseParams = {
      content_type: '2wKn6yEnZewu2SCCkus4as',
      order: "-fields.date",
      limit: page_size
    }

    let params, action;
    if(slug) {
      action = 'show';
      params = Object.assign({}, baseParams, { limit: 1, 'sys.id': slug })
    } else {
      const skip = (page - 1) * page_size;
      action = 'index';
      params = Object.assign({}, baseParams, {select: 'sys.id,fields.title,fields.linkUrl,fields.date,fields.postFormat', skip})
    }

    return await contentful.getEntries(params)
    .then((response) => {
      return {
        ids,
        action,
        posts: response.items.map(formatPost),
        page,
        page_size,
        total_posts: response.total,
        total_pages: Math.ceil(response.total / page_size)
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, query } = nextProps.url
  }

  render() {
    const { posts, error, page, total_posts, total_pages, action, ids } = this.props;

    switch (action) {
      case 'show':
        const [ post ] = posts;
        return (
          <PageLayout section="posts">
            <BlogPost post={post} ids={ids} />
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