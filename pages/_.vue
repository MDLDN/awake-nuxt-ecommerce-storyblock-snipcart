<template>
  <div>
    <component
      :is="story.content.component | dashify"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    ></component>
  </div>
</template>

<script>
// eslint-disable-next-line prettier/prettier
const loadData = function ({ api, cacheVersion, errorCallback, version, path }) {
  return api
    .get(`cdn/stories/${path}`, {
      version: version,
      cv: cacheVersion
    })
    .then((res) => {
      return res.data
    })
    .catch((res) => {
      if (!res.response) {
        console.error(res)
        errorCallback({
          statusCode: 404,
          message: 'Failed to receive content from the api.'
        })
      } else {
        console.error(res.response.data)
        errorCallback({
          statusCode: res.response.status,
          message: res.response.data
        })
      }
    })
}

export default {
  data() {
    return { story: { content: {} } }
  },
  asyncData(context) {
    // Check if we are in the editing mode
    let editMode = false

    if (
      context.query._storyblok ||
      context.isDev ||
      (typeof window !== 'undefined' &&
        window.localStorage.getItem('_storyblok_draft_mode'))
    ) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('_storyblok_draft_mode', '1')
        if (window.location === window.parent.location) {
          window.localStorage.removeItem('_storyblok_draft_mode')
        }
      }

      editMode = true
    }

    const version = editMode ? 'draft' : 'published'
    const path = context.route.path === '/shop' ? 'shop' : context.route.path

    // Load the JSON from the API
    return loadData({
      version: version,
      api: context.app.$storyapi,
      cacheVersion: context.store.state.cacheVersion,
      errorCallback: context.error,
      path: path
    })
  },
  mounted() {
    this.$storyblok.init()
    this.$storyblok.on(['input', 'published', 'change'], (event) => {
      if (event.action === 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else if (event.storyId === this.story.id) {
        loadData({
          version: 'draft',
          api: this.$storyapi,
          cacheVersion: this.$store.state.cacheVersion,
          errorCallback: console.error,
          path: this.story.full_slug
        }).then((data) => {
          this.story = data.story
        })
      } else {
        window.location.reload()
      }
    })
  }
}
</script>
