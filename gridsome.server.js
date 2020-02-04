// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  const blogsByTitle = {}
  const postsByBlogs = {}

  // Collect many-to-many relationships as nodes are created
  api.onCreateNode(options => {
    if (options.internal.typeName === 'Blog') {
      blogsByTitle[options.title] = {
        id: options.id,
        uuid: options.$uid,
        title: options.title
      }
    }
    if (options.internal.typeName === 'Post') {
      options.blogs.forEach(blog => {
        postsByBlogs[blog] = postsByBlogs[blog] || []
        postsByBlogs[blog].push(options)
      })
    }
  })

  // Manually setup many-to-many references between Blogs and Posts
  // Netlify CMS uses "title" as an ID when using the Netlify CMS relation widget.
  // When using the `ref` key to set up references in grifsome.confg.js, an ID 
  //  is required but not provided by the Netlify CMS-created markdown.
  // This is an open Netlify CMS bug.
  //    https://github.com/netlify/netlify-cms/issues/2063
  //    https://github.com/netlify/netlify-cms/issues/1063
  api.loadSource(({ getCollection }) => {
    const blogsCollection = getCollection('Blog')

    for (blogsArray in postsByBlogs) {
      const posts = postsByBlogs[blogsArray]
      const blogTitle = posts[0].blogs[0]
      const blog = blogsByTitle[blogTitle]
      const node = blogsCollection.getNodeById(blog.id)
      console.log(posts)
      node.posts = posts
    }
  })
}
