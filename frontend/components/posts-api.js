import moment from 'moment'

const DEFAULT_KEY = '__DD_POSTS_API__';
const IS_BROWSER = typeof window !== 'undefined';

// TODO: Does the Cful API support If-Modified-Since?
const { createClient } = require('contentful');

import formatPost from './format-post'

const contentful = createClient({
  space: process.env.CFUL_SPACE_ID,
  accessToken: process.env.CFUL_ACCESS_TOKEN
});

const CFUL_BASE_PARAMS = {
  content_type: '2wKn6yEnZewu2SCCkus4as',
  order: "-fields.date",
  limit: 10
}

export default class PostsAPI {

  static getInstance() {
    if(IS_BROWSER) {
      if(!window[DEFAULT_KEY]) {
        console.log("> Initializing new PostsAPI on client")
        window[DEFAULT_KEY] = new PostsAPI({useCache: true});
      } else {
        console.log("> Using existing PostsAPI on client")
      }

      return window[DEFAULT_KEY];
    } else {
      // If server, always return a new instance
      console.log("> Initializing new PostsAPI on server")
      return new PostsAPI({});
    }
  }

  constructor({ useCache = false }) {
    this.cache = {};
    this.useCache = useCache;
  }

  async getEntryIds() {
    const params = Object.assign({}, CFUL_BASE_PARAMS, {
      select: 'sys.id,fields.date,fields.title',
      limit: 1000
    })

    return contentful.getEntries(params)
      .then((idsResponse) => {
        return idsResponse.items.map(item => item.sys.id)
      })
  }

  async getPostById(id) {
    const params = Object.assign({}, CFUL_BASE_PARAMS, { 
      limit: 1,
      'sys.id': id
    })

    return contentful.getEntries(params)
    .then((response) => {
      const posts = response.items.map(formatPost);

      return {
        posts
      }
    })
  }

  // This is deprecated in favor of sys.id
  async getPostBySlug(id) {
    const params = Object.assign({}, CFUL_BASE_PARAMS, { 
      limit: 1,
      'fields.slug': id
    })

    return contentful.getEntries(params)
    .then((response) => {
      const posts = response.items.map(formatPost);

      return {
        posts
      }
    })
  }

  async getPosts({ page = 1, limit = 20 }){
    const skip = (page - 1) * limit;
    const params = Object.assign({}, CFUL_BASE_PARAMS, {skip, limit})
    console.log(params)

    return contentful.getEntries(params)
      .then(response => {
        const posts = response.items.map(formatPost);
        const total_posts = response.total;
        const total_pages = Math.ceil(total_posts / limit);

        return {
          posts,
          page,
          limit,
          total_posts,
          total_pages
        }
      })
  }
}