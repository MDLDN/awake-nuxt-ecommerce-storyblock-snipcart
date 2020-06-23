/* eslint-disable camelcase */
import path from 'path'
import glob from 'glob'
import axios from 'axios'
import head from './config/head'
import { modules, modulesSettings } from './config/modules'
import plugins from './config/plugins'
import build from './config/build'
import css from './config/css'
import { routeMap, otherRoutes } from './config/generate'

export default {
  mode: 'universal',
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Headers of the page
   */
  head: head,
  generate: {
    routes: otherRoutes.concat(getDynamicPaths(routeMap)),
    function(callback) {
      const token = `tOgOHprbGKddMQ4hEmYqrgtt` // replace with your key
      const per_page = 100
      const version = 'draft'
      let cache_version = 0

      const page = 1
      const routes = ['/shop']

      // Load space and receive latest cache version key to improve performance
      axios
        .get(`https://api.storyblok.com/v1/cdn/spaces/me?token=${token}`)
        .then((space_res) => {
          // timestamp of latest publish
          cache_version = space_res.data.space.version

          // Call first Page of the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
          axios
            .get(
              `https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&per_page=${per_page}&page=${page}&cv=${cache_version}`
            )
            .then((res) => {
              Object.keys(res.data.links).forEach((key) => {
                if (
                  res.data.links[key].slug !== 'shop' &&
                  res.data.links[key].is_folder === false
                ) {
                  routes.push('/shop' + res.data.links[key].slug)
                }
              })

              // Check if there are more pages available otherwise execute callback with current routes.
              const total = res.headers.total
              const maxPage = Math.ceil(total / per_page)
              if (maxPage <= 1) {
                callback(null, routes)
              }

              // Since we know the total we now can pregenerate all requests we need to get all Links
              const contentRequests = []
              for (let page = 2; page <= maxPage; page++) {
                contentRequests.push(
                  axios.get(
                    `https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&per_page=${per_page}&page=${page}`
                  )
                )
              }

              // Axios allows us to execute all requests using axios.spread we will than generate our routes and execute the callback
              axios
                .all(contentRequests)
                .then(
                  axios.spread((...responses) => {
                    responses.forEach((response) => {
                      Object.keys(response.data.links).forEach((key) => {
                        if (
                          response.data.links[key].slug !== 'shop' &&
                          res.data.links[key].is_folder === false
                        ) {
                          routes.push('/shop' + response.data.links[key].slug)
                        }
                      })
                    })

                    callback(null, routes)
                  })
                )
                .catch(callback)
            })
        })
    }
  },
  /*
   ** Global CSS
   */
  css: css,
  link: {
    rel: 'stylesheet',
    href: 'https://cdn.snipcart.com/themes/v3.0.11/default/snipcart.css'
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: plugins,
  /*
   ** Nuxt.js modules
   */
  modules: modules,
  ...modulesSettings,
  /*
   ** Build configuration
   */
  build: build
}

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map((url) => {
      const filepathGlob = urlFilepathTable[url]
      return glob.sync(filepathGlob, { cwd: 'content' }).map((filepath) => {
        return `${url}/${path.basename(filepath, '.md')}`
      })
    })
  )
}
