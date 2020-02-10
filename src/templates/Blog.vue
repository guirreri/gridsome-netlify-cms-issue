<template>
  <Layout>
    <header>
      <h2>{{ blog.title }} (id: {{ blog.id }})</h2>
      <p>{{ blog.excerpt }}</p>
    </header>

    <!-- Does not return any posts because `belongsTo` is returning an empty array -->
    <article v-for="post in posts" :key="`post-${post.id}`">
      <g-link :to="post.path"><h3>{{post.title}} ({{post.id}})</h3></g-link>
    </article>
    <footer>Blog Footer</footer>
  </Layout>
</template>

<page-query>
query Blog ($id: ID!) {
  blog (id: $id) {
    id
    title
    path
    belongsTo {
      edges {
        node {
          ... on Post {
            id
            path
            title
            excerpt
          }
        }
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$route.params.id
    };
  },
  computed: {
    blog() {
     return this.$page.blog
    },
    posts() {
    //  return this.$page.blog.posts
     return this.$page.blog.belongsTo.edges.map(edge => edge.node)
    }
  }
}
</script>

<style>

</style>