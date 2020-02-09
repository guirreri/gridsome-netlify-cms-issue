// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  const blogsByTitle = {}
  const postsByBlogs = {}
  const allPosts = []

  // Manually setup many-to-many references between Blogs and Posts
  // Netlify CMS uses "title" as an ID when using the Netlify CMS relation widget.
  // When using the `ref` key to set up references in grifsome.confg.js, an ID 
  //  is required but not provided by the Netlify CMS-created markdown.
  // This is an open Netlify CMS bug.
  //    https://github.com/netlify/netlify-cms/issues/2063
  //    https://github.com/netlify/netlify-cms/issues/1063
  api.loadSource(({ getCollection, store }) => {
    const blogsCollection = getCollection('Blog')
    const postsCollection = getCollection('Post')

    // Collect many-to-many relationships as nodes are created
    blogsCollection.data().forEach(blog => {
        blogsByTitle[blog.title] = blog
    })
    postsCollection.data().forEach(post => {
        allPosts.push(post)
        post.blogs.forEach(blog => {
          postsByBlogs[blog] = postsByBlogs[blog] || []
          postsByBlogs[blog].push(post)
        })
    })

    // Netlify CMS does not create an ID when using the relation widget
    // For each blog, replace the blog title with a uniuqe ID
    // An id field is required in order for belongsTo to exist in Graph QL
    for (blogsArray in postsByBlogs) {
      const posts = postsByBlogs[blogsArray]
      const blogTitle = posts[0].blogs[0]
      const blog = blogsByTitle[blogTitle]
      const node = blogsCollection.getNodeById(blog.id)
      node.posts = posts
    }

    // For each post, replace the blog title with the blog's unique ID
    allPosts.forEach((post, index, array) => {
      const blogs = []
      post.blogs.map(blogTitle => {
        const blog = blogsByTitle[blogTitle]
        // TODO: Investigate here why pushing the entire blog object breaks the 
        //  build with a maximum stack error
        blogs.push({
          id: blog.id,
          path: blog.path,
          title: blog.title
        })
      })
      const node = postsCollection.getNodeById(post.id)
      node.blogs = blogs
    })
  })
}
