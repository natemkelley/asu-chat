require('dotenv').config({
  path: ".env.local"
})

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'ASU Chat' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel:'stylesheet',href:'https://fonts.googleapis.com/icon?family=Material+Icons'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/node_modules/materialize-css/dist/css/materialize.min.css',
    '@/assets/css/main.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/materialize', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    ["@nuxtjs/dotenv", {
      filename: ".env.local"
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      '@nuxtjs/firebase',
      { 
        config: {
          apiKey: process.env.apiKey,
          authDomain: "asu-chat.firebaseapp.com",
          databaseURL: "https://asu-chat.firebaseio.com",
          projectId: "asu-chat",
          storageBucket: "asu-chat.appspot.com",
          messagingSenderId: process.env.messagingSenderId,
          appId: process.env.appId,
          measurementId: process.env.measurementId
        },
        services: {
          firestore: true 
        }
      }
    ]

  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
