import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'


Vue.use(VueAxios, axios);
Vue.use(VueTabs);

axios.defaults.baseURL = "https://scheduler-rest.herokuapp.com/api/";
Vue.prototype.$bus = new Vue();


new Vue({
    router,
    store,
  render: h => h(App),
}).$mount('#app');
