// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Test',
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link'
    }
  },

  // Routes
  // TODO: Figure out a way to maybe make a post dynamically be under something like "/:blog-title"
  templates: {
    Post: '/:year/:month/:day/:title',
    Blog: '/:title'
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blogs/**/*.md',
        typeName: 'Blog',
        remark: {
          plugins: []
        },
        // Not needed because this reference is created via gridsome.server.js
        // refs: {
        //   posts: {
        //     typeName: 'Post',
        //   }
        // },
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'posts/**/*.md',
        typeName: 'Post',
        remark: {
          plugins: []
        },
        // Not needed because this reference is created via gridsome.server.js
        // refs: {
        //   blogs: {
        //     typeName: 'Blog',
        //     // create: true
        //   }
        // },
      }
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    },
  ]
}