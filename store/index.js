import { isString } from 'lodash'
import Vuex from 'vuex'
export const state = () => ({
  pageType: '',
  title: '',
  subtitle: '',
  featureImage: '',
  content: '',
  author: '',
  date: ''
})
export const mutations = {
  set(state, data) {
    state = Object.assign(state, data)
  }
}
export const actions = {
  nuxtServerInit(store, context) {
    this.$cms = context.store.$cms
  },
  set({ commit }, { resource, slug }) {
    if (!resource) {
      setOtherPageData(commit, this.$siteConfig)
    } else {
      const theResource = isString(resource) ? this.$cms[resource] : resource
      const data = Object.assign(theResource.getOne(slug), {
        pageType: theResource.slug
      })
      data.slug = slug
      commit('set', data)
    }
  }
}

function setOtherPageData(commit, siteConfig) {
  commit('set', {
    title: siteConfig.siteName,
    subtitle: siteConfig.tagline,
    featureImage: siteConfig.featureImage
  })
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      cacheVersion: ''
    },
    mutations: {
      setCacheVersion(state, version) {
        state.cacheVersion = version
      }
    },
    actions: {
      loadCacheVersion({ commit }) {
        return this.$storyapi.get(`cdn/spaces/me`).then((res) => {
          commit('setCacheVersion', res.data.space.version)
        })
      }
    }
  })
}

export default createStore
