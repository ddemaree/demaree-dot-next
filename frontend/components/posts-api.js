import axios from 'axios'
import moment from 'moment'

const DEFAULT_KEY = '__DD_POSTS_API__';
const IS_BROWSER = typeof window !== 'undefined';

const postsApi = axios.create({
  baseURL: `${process.env.POSTS_API}/wp-json/wp/v2`
})

// Re-formats JSON from the WP API to a document the frontend will understand
const wpPostToGoodJson = (post) => {
  const postDate = moment(post.date_gmt);
  const publish_date = postDate.toISOString();
  const permalink = `/posts/${postDate.format('YYYY')}/${post.slug}`;

  return {
    permalink,
    title: post.title.rendered,
    content: post.content.rendered,
    format: (post.format || "standard"),
    slug: (post.slug || "no-slug"),
    moment: postDate,
    date: post.date_gmt,
    publish_date,
    link_url: post.link_url,
    punk: (hello) => { return hello; },
    // _post: {...post}
  }
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

  async getPostBySlug(id) {
    return postsApi.get('/posts', {
      params: { slug: id }
    })
    .then(response => {
      let posts = response.data.map(wpPostToGoodJson);

      return {
        slug: id,
        posts,
        thisPost: posts[0]
      }
    })
    .catch(err => {
      console.trace(err);
    })
  }

  async getPosts({ page = 1, per_page = 20 }){
    return postsApi.get('/posts', {
      params: { page, per_page }
    })
    .then(response => {
      let posts = response.data;
      let total_posts = parseInt(response.headers['x-wp-total'])
      let total_pages = parseInt(response.headers['x-wp-totalpages'])
      return {
        posts: posts.map(wpPostToGoodJson),
        total_posts,
        total_pages,
        page,
        per_page
      }
    })
    .catch(err => {
      console.log(err);
      let { message, request } = err;
      let { status } = request || {};

      return {
        posts: [],
        totalPosts: 0,
        totalPages: 0,
        error: {
          message,
          status
        }
      }
    })
  }
}