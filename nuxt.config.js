// This file is used whenever creating a dev server and build.
// The settings present are taken into account during the build.
// They affect what gets rendered in the final build.

// Is an express middleware and uses the Node import syntax.

const bodyParser = require('body-parser');

// Axios to be executed by node.js, thus the syntax.

const axios = require('axios'); 

export default {
  // Selected during create-nuxt-app.
  // Other choice was SPA.
  // Setting it to Universal allows the use of the pre-rendering feature.
  mode: 'universal',

  /*
  ** Headers of the page
  */
  // Allows defining of general data that should be 
  // in the 'header' section of any rendered page.
  // The settings in the head are added to every single page.
  // The settings are also inputted as an object.
  // In addition, if a page requires specific head data,
  // it is possible to do so only on PAGE COMPONENTS by
  // adding a 'head' object.
  head: {
    title: 'The Anime Blog' || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', ref: 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  // Set to false to disable.
  // Can also set a failed colour by adding 'failedColor'
  // Also height and duration
  loading: { color: '#fa923f' },
  /*
  ** Global CSS
  */
  // Add paths to CSS files to be designated as global.
  css: [
    '~assets/styles/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  // Allows the loading of certain functionalities and codes before the app is fully rendered and mounted.
  // Allows components to become global here.
  // Non Vue related codes can also be run here, like a polyfill.
  // Any global JS files needed to be run on before app start-up.
  // Also possible to register a filter.
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],
  /*
  ** Nuxt.js modules
  */
  // Allows the adding of convenience features.
  // Can be created by any dev.
  // Nuxt Awesome for curated modules.
  modules: [
    '@nuxtjs/axios',
  ],
  // Special config item for Axios
  // baseURL can be accessed anywhere using this.$axios
  // Except for the nuxtServerInit action where it can be accessed within context.
  // context.app.$axios.
  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-anime-blog.firebaseio.com',
    credentials: false
  },
  /*
  ** Build configuration
  */
  // Settings about the build process.
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  // Takes a boolean.
  // Define if in dev mode or otherwise.
  // dev

  // Allows you to set own environment variables
  // that will be injected into the project.
  // You can reference global env variables from
  // the node env.
  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxt-anime-blog.firebaseio.com',
    fbApiKey: 'AIzaSyCoQm-pMFX2GzQDc4sRoqRlKaNbTvDhYgw'
  },

  // Change the way Nuxt statically generates pages.
  // generate

  // Can be used to set the root dir.
  // '/' is the default value.
  // Had to include node_modules folder.
  // rootDir

  // Allows overwriting settings of the Nuxt router. 
  // Refer to the Vue Router docs for more info.
  router: {
    // middleware: 'log'
  },

  // Set the root dir of Nuxt files.
  // srcDir

  // Setting page transitions.
  // Strings indicate that transition will look for the class with the name equalling the string
  // An object needs to have a name prop and the mode.
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  // Collection of node and express comp. middlewares that will be executed prior to
  // the Nuxt rendering process. Here is the place to register any express middleware
  // to be ran first in the app. Middlewares are executed from top to bottom.
  serverMiddleware: [
    // Parse incoming JSON bodies and add them to the request object in the api/index.js
    bodyParser.json(),
    '~/api'
  ],

  // For Static Web App deployment
  generate: {
    // Takes a function that return an array of routes that should be pre rendered.
    // In the array of routes, it is possible to add all the dynamic routes for the 
    // multiple dynamic elements on the app.
    // It is also possible to execute HTTP requests here. One use case is as a solution 
    // to avoid having to manually type a large number of dynamic elements.

    routes: function() {

      // Used to fetch all the dynamic posts. Promises are allowed here
      // thus return the axios call.

      return axios.get('databaseURL')
      .then(res => {

          // Return an array that contains all the posts to be rendered.
          // '/posts/[postID]' should be the syntax.

          let routes = [];
          
          // Turning the array to an object is done to limit the HTTP requests sent.
          // This is because when a users clicks a post, it is usually gotten through
          // an axios call to firebase. This is redundant as every post is now pre-rendered
          // through here.

          for (const key in res.data) {
            routes.push({
              route: '/posts/' + key,
              // Can contain data to be passed to the generated route.
              payload: {postData: res.data[key]} 
            });
          }

          return routes;
      })

      // Only prerender one or a few dynamic elements.

      // return [
      //   '/posts/[postID]'
      // ] 
    }
  }
}
