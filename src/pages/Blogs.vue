<template>
  <Layout>
    <header>
      <h2>All Blogs</h2>
    </header>
    <section>
      <header>
        <h2 v-for="(blog, index) in blogs" :key="`blog-${index}`">
          <g-link :to="blog.node.path">{{blog.node.title}} {{blog.node.id}}</g-link>
        </h2>
      </header>
    </section>
    <section>
      <header>
        <h2>All Posts</h2>
      </header>
      <p v-for="(post, index) in posts" :key="`post-${index}`">
        <g-link :to="post.node.path">{{post.node.title}} {{post.node.id}}</g-link>
      </p>
    </section>
  </Layout>
</template>

<page-query>
query AllBlogsAndPosts {
  blogs: allBlog (
    sortBy: "date", order: DESC
  ) {
    edges {
      node {
        id
        path
        title
      }
    }
  },
  posts: allPost (
    sortBy: "date", order: DESC
  ) {
    edges {
      node {
        id
      }
    }
  }
}
</page-query>

<script>
export default {
  computed: {
    blogs() {
     return this.$page.blogs.edges
    },
    posts() {
     return this.$page.posts.edges
    }
  }
}
</script>

<style>

</style>