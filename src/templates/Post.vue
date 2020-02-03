<template>
  <Layout>
    <article>
      <header>
        <h2>{{ post.title }} (id: {{ post.id }})</h2>
        <time>{{ post.date }}</time>
        <p>{{ post.excerpt }}</p>
      </header>
      <section v-html="post.content"/>
      <h3>Other blogs with this post...</h3>
      <p v-for="post in posts" :key="`post-${post.id}`">
        <g-link :to="post.path">{{post.title}}</g-link>
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
    belongsTo {
      edges {
        node {
          ... on Blog {
            id
            title
            path
            content
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
     return this.$page.post.belongsTo.edges.map(edge => edge.node)
    }
  }
}
</script>

<style>

</style>