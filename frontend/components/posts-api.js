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
    date: post.date_gmt
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

  static async getPosts({ page, per_page }){
    return postsApi.get('/posts', {
      params: { page, per_page }
    })
    .then(response => {
      let posts = response.data;
      let totalPosts = response.headers['x-wp-total'];
      let totalPages = response.headers['x-wp-totalpages'];
      return {
        posts: posts.map(wpPostToGoodJson),
        totalPosts,
        totalPages
      }
    })
    .catch(err => {
      return {
        posts: [],
        totalPosts: 0,
        totalPages: 0,
        error: ""
      }
    })
  }
}