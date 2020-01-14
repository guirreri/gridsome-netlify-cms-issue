<template>
  <Layout>
    <header>
      <h2>(id: {{ blog.id }})</h2>
      <!-- <time>{{ blog.date }}</time> -->
      <!-- <p>{{ blog.excerpt }}</p> -->
    </header>
    <article v-for="post in posts" :key="`post-${post.id}`">
      <g-link :to="post.path"><h3>{{post.title}}</h3></g-link>
    </article>
    <footer>Blog Footer</footer>
  </Layout>
</template>

<page-query>
query Blog ($id: ID!) {
  blog (id: $id) {
    id
    belongsTo {
      edges {
        node {
          ...on Post {
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
     return this.$page.blog.belongsTo.edges.map(edge => edge.node)
    }
  }
}
</script>

<style>

</style>