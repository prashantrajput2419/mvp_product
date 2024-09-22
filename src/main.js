// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VuePaginate from 'vue-pagination-2'
import Vue2Filters from 'vue2-filters'
import VueMoment from 'vue-moment'
import Multiselect from 'vue-multiselect'

Vue.config.productionTip = false
Vue.component('pagination', VuePaginate)
Vue.component('multiselect', Multiselect)
Vue.use(VueMoment)
Vue.use(Vue2Filters)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
