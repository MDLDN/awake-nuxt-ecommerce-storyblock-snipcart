import Vue from 'vue'
import CategoriesGrid from '../components/grids/CategoriesGrid'
import DisqusComments from '../components/DisqusComments'
import IntersectionObserver from '../components/IntersectionObserver'
import LoadingSpinner from '../components/LoadingSpinner'
import MainSection from '../components/MainSection'
import NewsLetterSlideOut from '../components/NewsLetterSlideOut'
import PostsGrid from '../components/grids/PostsGrid'
import SiteFooter from '../components/SiteFooter'
import Page from '../components/Page.vue'
import Teaser from '../components/Teaser.vue'
import Grid from '../components/Grid.vue'
import Feature from '../components/Feature.vue'
import Product from '../components/Product.vue'
import SiteHero from '../components/SiteHero'
import SiteLogo from '../components/SiteLogo'
import SiteNav from '../components/SiteNav'
import ResourceGrid from '~/components/grids/ResourceGrid'

Vue.component(CategoriesGrid.name, CategoriesGrid)
Vue.component(DisqusComments.name, DisqusComments)
Vue.component(IntersectionObserver.name, IntersectionObserver)
Vue.component(LoadingSpinner.name, LoadingSpinner)
Vue.component(MainSection.name, MainSection)
Vue.component(NewsLetterSlideOut.name, NewsLetterSlideOut)
Vue.component(PostsGrid.name, PostsGrid)
Vue.component(SiteFooter.name, SiteFooter)
Vue.component('blok-page', Page)
Vue.component('blok-teaser', Teaser)
Vue.component('blok-grid', Grid)
Vue.component('blok-feature', Feature)
Vue.component('blok-product', Product)
Vue.component(SiteHero.name, SiteHero)
Vue.component(SiteLogo.name, SiteLogo)
Vue.component(SiteNav.name, SiteNav)
Vue.component(ResourceGrid.name, ResourceGrid)
