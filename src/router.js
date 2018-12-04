import Vue from 'vue'
import Router from 'vue-router'

//Components
import OptionSelect from './components/OptionSelect'
import TimeTable from './components/TimeTable'
import OptionSelectLayout from './components/OptionSelectLayout'

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
            name: 'TimeTable',
            component: TimeTable
        }
    ]
})