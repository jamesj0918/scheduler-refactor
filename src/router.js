import Vue from 'vue'
import Router from 'vue-router'

//Components
import OptionSelectLayout from './components/OptionSelectLayout'
import ResultList from "./components/ResultList";
import Result from "./components/Result"
import ResultLayout from "./components/ResultLayout"

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'OptionSelectLayout',
            component: OptionSelectLayout
        },
        {
            path: '/result',
            name: 'ResultLayout',
            component: ResultLayout,
            children:[
                {
                    path: '/',
                    name: 'ResultList',
                    component: ResultList,
                },
                {
                    path: ':result_index',
                    name: 'Result',
                    props: true,
                    component: Result,
                }
            ]
        }
    ]
})