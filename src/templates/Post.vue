<template>
  <Layout>
    <article>
      <header>
        <h2>{{ post.title }} (id: {{ post.id }})</h2>
        <time>{{ post.date }}</time>
        <p>{{ post.excerpt }}</p>
      </header>
      <section v-html="post.content"/>
      <h3>All blogs with this post...</h3>
      <p v-for="blog in blogs" :key="`post-${blog.id}`">
        <g-link :to="blog.path">{{blog.title}}</g-link>
      </p>
      <footer>Post Footer</footer>
    </article>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
   post: post (path: $path) {
    id
    title
    excerpt
    content
    date (format: "D MMMM YYYY")
    blogs {
      id
      title
      path
    }
    belongsTo {
      edges {
        node {
          ... on Blog {
            id
            title
            path
          }
        }
      }
    }
  }
}
</page-query>

<script>
export default {
  computed: {
    post() {
     return this.$page.post 
    },
    blogs() {
    //  return this.$page.post.blogs
     return this.$page.post.belongsTo.edges.map(edge => edge.node)
    }
  }
}
</script>

<style>

</style>