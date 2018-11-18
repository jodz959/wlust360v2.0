// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vSelect from 'vue-select'
import BootstrapVue from 'bootstrap-vue'
import VueSession from 'vue-session'
import App from './App'
import router from './router'
import 'bootstrap/dist/minty/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/base.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueSession)

/* eslint-disable no-new */
Vue.component('v-select', vSelect)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
