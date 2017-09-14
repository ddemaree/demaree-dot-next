import moment from 'moment'
import { keyBy, forEach, indexOf } from 'lodash'

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


function savePostsToCache(posts) {
  if(!IS_BROWSER) return null;
  __DD_CACHE__.posts = Object.assign(__DD_CACHE__.posts, keyBy(posts, p => p.id));
  return null;
}

function getCachedPostById(id) {
  if(!IS_BROWSER) return null;
  let { posts } = __DD_CACHE__;
  return posts[id] || null;
}


class PostsAPI {

  static getInstance() {
    if(!IS_BROWSER) return new PostsAPI();

    if(!window[DEFAULT_KEY]) {
      window[DEFAULT_KEY] = new PostsAPI();
    }

    return window[DEFAULT_KEY];
  }

  async getEntryIds() {
    if(IS_BROWSER && window.__DD_CACHE__){
      const { ids } = __DD_CACHE__;
      return Promise.resolve(ids);
    }

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
    const cachedPost = getCachedPostById(id);
    if(cachedPost) return Promise.resolve({posts: [cachedPost]});

    const params = Object.assign({}, CFUL_BASE_PARAMS, { 
      limit: 1,
      'sys.id': id
    })

    return contentful.getEntries(params)
    .then((response) => {
      const posts = response.items.map(formatPost);
      savePostsToCache(posts);
      return {
        posts
      }
    })
  }

  async getPostWithPrevAndNext(currId) {
    // Store this in a variable so it can be reused to determine the post's position
    let _allIds, _currIdIndex; 
  
    return this.getEntryIds()
      .then(allIds => {
        let prevId, nextId, currIdIndex;
        if(currId) {
          currIdIndex = indexOf(allIds, currId);
          prevId = allIds[currIdIndex - 1];
          nextId = allIds[currIdIndex + 1];
        }
        
        _allIds = allIds;
        _currIdIndex = currIdIndex;
      
        return [prevId, currId, nextId];
      })
      .then(postIds => {
        let promises = postIds.map(thisId => {
          if(!thisId) return Promise.resolve(null)
          return this.getPostById(thisId)
        })
        return Promise.all(promises)
      })
      .then(results => {
        let [prevPost, currPost, nextPost] = results.map(res => {
          return res ? res.posts[0] : null;
        });
  
        return {
          current_index: _currIdIndex,
          total_posts: _allIds.length,
          ids: _allIds,
          posts: [
            Object.assign({}, currPost, { prevPost, nextPost })
          ]
        }
      })
  }


  async getPosts({ page = 1, limit = 20 }){
    const skip = (page - 1) * limit;
    const params = Object.assign({}, CFUL_BASE_PARAMS, {skip, limit})

    return contentful.getEntries(params)
      .then(response => {
        const posts = response.items.map(formatPost);
        const total_posts = response.total;
        const total_pages = Math.ceil(total_posts / limit);

        savePostsToCache(posts);

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

if(IS_BROWSER) {
  let { ids, posts } = window.__NEXT_DATA__.props;
  window.__DD_CACHE__ = {};
  __DD_CACHE__.ids = ids;
  __DD_CACHE__.posts = {};
  if(posts) savePostsToCache(posts);
}

export default PostsAPI;