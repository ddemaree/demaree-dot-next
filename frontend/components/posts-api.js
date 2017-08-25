import axios from 'axios'
import moment from 'moment'

const postsApi = axios.create({
  baseURL: `${process.env.POSTS_API}/wp-json/wp/v2`
})

// Re-formats JSON from the WP API to a document the frontend will understand
const wpPostToGoodJson = (post) => {
  return {
    title: post.title.rendered,
    content: post.content.rendered,
    format: (post.format || "standard"),
    slug: (post.slug || "no-slug"),
    date: post.date_gmt,
    link_url: post.link_url,
    _post: {...post}
  }
}

export default class PostsAPI {
  static async getPostBySlug(id) {
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

  static async getPosts({ page = 1, per_page = 10 }){
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