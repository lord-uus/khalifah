const path = require('path');

module.exports = {
  siteName: 'Khalifah XYZ',
  siteUrl: 'https://khalifah.xyz',
  icon: './src/ikon.png',

  plugins: [
    {
      use: 'gridsome-plugin-robots-txt'
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        config: {
          '/post/*': {
            changefreq: 'weekly',
            priority: 0.9
          },
          '/kategori/*': {
            changefreq: 'weekly',
            priority: 0.7
          },
          '/label/*': {
            changefreq: 'weekly',
            priority: 0.5
          },
          '/label/khalifah': {
            changefreq: 'daily',
            priority: 0.5
          },
          '/pengarang/*': {
            changefreq: 'monthly',
            priority: 0.1
          },
          '/tentang': {
            changefreq: 'monthly',
            priority: 0.1
          },
          '/tautan': {
            changefreq: 'monthly',
            priority: 0.1
          }
        }
      }
    },
    {  
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {},
        presetEnvConfig: {},
        shouldPurge: true,
        shouldImport: true,
        shouldTimeTravel: true,
        shouldPurgeUnusedKeyframes: true,
      }
    },
    {
      use: 'gridsome-source-static-meta',
      options: {
        path: 'content/site/*.json'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Author',
        path: './content/author/*.md'
      }
    }, 
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Blog',
        path: './content/blog/**/*.md',
        refs: {
          author: 'Author',
          tags: {
            typeName: 'Tag',
            create: true
          },
          category: {
            typeName: 'Category',
            create: true
          }
        }
      }
    }
  ],

  transformers : {
    remark : {
      plugins : [
        '@noxify/gridsome-remark-table-align',
        ['@noxify/gridsome-remark-classes', {
          'paragraph': 'text-normal font-serif py-2',
          'table': 'table table-striped',
          'tableCell[align=center]' : 'text-center',
          'tableCell[align=right]': 'text-right',
          'list[ordered=true]': 'list-decimal ml-5',
          'list:not([ordered=true])': 'list-disc ml-5'
        }]
      ]
    }
  },

  templates: {
    Blog: [
      {
        path: '/post/:title'
      }
    ],
    Category: [{
      path: '/kategori/:title',
      component: '~/templates/Category.vue'
    }],
    Author: [{
      path: '/pengarang/:name',
      component: '~/templates/Author.vue'
    }],
    Tag: [{
      path: '/tags/:title',
    }]
  }
}
