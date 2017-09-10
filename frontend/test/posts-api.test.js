const contentful = require('contentful')

import PostsAPI from '../components/posts-api'
const postsAPI = PostsAPI.getInstance();

afterEach(() => {
  contentful.__resetData();
});

describe("getEntryIds()", ()=>{
  beforeEach(() => {
    contentful.__setResponse({
      items: [
        { "sys": { "id": 1 } },
        { "sys": { "id": 2 } },
        { "sys": { "id": 3 } }
      ]
    })
  });

  test("collects each sys.id", () => {
    return postsAPI.getEntryIds()
      .then(ids => {
        expect(ids).toEqual([1,2,3]);
      })
  });
});