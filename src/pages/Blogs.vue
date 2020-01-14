<template>
  <Layout>
    <header>
      <h2>Blogs</h2>
    </header>
    <article>
      <header>
        <h2 v-for="(blog, index) in blogs" :key="`blog-${index}`">
          <g-link :to="blog.node.path">{{blog.node.id}}</g-link>
        </h2>
      </header>
      <footer>Blog Footer</footer>
    </article>
  </Layout>
</template>

<page-query>
query Blogs {
  blogs: allBlog (
    sortBy: "date", order: DESC
  ) {
    edges {
      node {
        id
        path
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
    }
  }
}
</script>

<style>

</style>