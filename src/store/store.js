import Vue from 'vue'
import Vuex from 'vuex'

import timeTable from './modules/TimeTable_module'
import submit from './modules/Submit_module'
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        timeTable,
        submit
    }
});

export default store
