/* eslint-disable prettier/prettier */
export default function ({ store }) {
  if (!store.state.cacheVersion) {
    store.dispatch('loadCacheVersion')
  }
}
