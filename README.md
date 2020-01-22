# Issue with Gridsome + Netlify CMS

## Goal

Create a Gridsome + Netlify CMS website that allows for multiple, CMS-created Blogs, each containing multuple CMS-created Posts. A Post should be able to be associated with more than one Blog.

**A user should be able to:**

1. View a "blogs" page listing and linking to each individual blog.
    * Clicking a link on the "blogs" page goes to an individual blog.
2. View a "blog" page listing and linking to each individual post associated with that blog.
    * Clicking a link on the "blog" page goes to an individual post.
3. View a "post" page, listing and linking to blogs associated with the post.
    * Clicking a link on the "post" page goes back to an individual blog.

**A Netlify CMS admin user should be able to:**

1. View and create two separate content types: "Blogs" and "Posts"
2. When creating a Blog, modify custom fields such as title and excerpt.
3. When creating a Post, modify a "Blogs" field to associate the post with one or many blogs.

## Issues

Netlify CMS' relation widget appears to be the only way to create a one-or-more list of pre-defined items. While I can now properly reference a Post with one or more of the dynamically created Blogs, a Blog can not have any properties other than `id` and `title`.

## Setup (Default starter for Gridsome)

This is the project you get when you run `gridsome create new-project`.

### 1. Install Gridsome CLI tool if you don't have

`npm install --global @gridsome/cli`

### 2. Create a Gridsome project

1. `gridsome create my-gridsome-site` to install default starter
2. `cd my-gridsome-site` to open the folder
3. `gridsome develop` to start a local dev server at `http://localhost:8080`
4. Happy coding 🎉🙌
