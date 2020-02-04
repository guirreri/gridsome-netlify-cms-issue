// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  const blogsByTitle = {}
  const postsByBlogs = {}
  const allPosts = []

  // Collect many-to-many relationships as nodes are created
  api.onCreateNode(node => {
    if (node.internal.typeName === 'Blog') {
      blogsByTitle[node.title] = node
    }
    if (node.internal.typeName === 'Post') {
      allPosts.push(node)
      node.blogs.forEach(blog => {
        postsByBlogs[blog] = postsByBlogs[blog] || []
        postsByBlogs[blog].push(node)
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
    const postsCollection = getCollection('Post')

    for (blogsArray in postsByBlogs) {
      const posts = postsByBlogs[blogsArray]
      const blogTitle = posts[0].blogs[0]
      const blog = blogsByTitle[blogTitle]
      const node = blogsCollection.getNodeById(blog.id)
      node.posts = posts
    }

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
