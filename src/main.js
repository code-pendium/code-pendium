import Vue from "vue"
import App from "./App.vue"
import router from "./plugins/router"
import store from "./plugins/store"

import Vuetify from "./plugins/vuetify"
import VueWorker from "vue-worker"
import VuePageTitle from "vue-page-title"
import VueTyper from "vue-typer"
import VueTopProgress from "vue-top-progress"

Vue.config.productionTip = false
Vue.use(VueWorker, "$worker")
Vue.use(VuePageTitle, { router })
Vue.use(VueTyper)
Vue.use(VueTopProgress)

new Vue({
  router,
  store,
  render: h => h(App),
  vuetify: Vuetify
}).$mount("#app")