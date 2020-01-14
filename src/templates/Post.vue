<template>
  <Layout>
    <article>
      <header>
        <h2>{{ post.title }} (id: {{ post.id }})</h2>
        <time>{{ post.date }}</time>
        <p>{{ post.excerpt }}</p>
      </header>
      <section v-html="post.content"/>
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
  }
}
</page-query>

<script>
export default {
  computed: {
    post() {
     return this.$page.post 
    }
  }
}
</script>

<style>

</style>