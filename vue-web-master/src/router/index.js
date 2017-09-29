import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import NewsList from '@/components/NewsList'
import Pagebar from '@/components/PageBar'
import Shopcar from '@/components/shopCar'
import Calendar from '@/components/Calendar'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/newsList',
      name: 'NewsList',
      component: NewsList
    },
    {
      path: '/pagebar',
      name: 'Pagebar',
      component: Pagebar
    },
    {
      path: '/shopcar',
      name: 'Shopcar',
      component: Shopcar
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    }
    
  ]
})
