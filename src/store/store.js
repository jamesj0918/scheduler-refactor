import Vue from 'vue'
import Vuex from 'vuex'

import timeTable from './modules/TimeTable_module'
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        timeTable,
    }
});

export default store
