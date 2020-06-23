<template>
  <div class="products">
    <h1>Products</h1>
    <ul class="overview">
      <li
        v-for="product in stories"
        :key="product.full_slug"
        class="overview__item"
      >
        <nuxt-link
          class="overview__item-inner"
          :to="'/shop' + product.full_slug"
        >
          <h2>{{ product.content.name }}</h2>
          <img
            v-if="product.content.images.length > 0"
            width="100%"
            :src="product.content.images[0].filename | resize('300x0')"
            :alt="product.content.images[0].name"
          />
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return { stories: [] }
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
    return context.app.$storyapi
      .get(`cdn/stories/`, {
        starts_with: 'products/',
        version: editMode ? 'draft' : 'published',
        cv: context.store.state.cacheVersio
      })
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        if (!res.response) {
          console.error(res)
          // eslint-disable-next-line no-undef
          errorCallback({
            statusCode: 404,
            message: 'Failed to receive content from the api.'
          })
        } else {
          console.error(res.response.data)
          // eslint-disable-next-line no-undef
          errorCallback({
            statusCode: res.response.status,
            message: res.response.data
          })
        }
      })
  }
}
</script>

<style>
.products {
  padding-top: 60px;
  margin: 0 auto;
  max-width: 1000px;
}

.overview {
  display: flex;
  flex-direction: row;
  margin: 0px;
  padding: 0px;
  margin-top: 20px;
}

.overview__item {
  margin: 0 0.5rem;
  width: calc(100% / 3 * 1);
  list-style: none;
}

.overview__item-inner {
  padding: 24px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px 0 rgba(14, 30, 37, 0.36);
  text-decoration: none;
  color: #000;
  display: block;
}
</style>
