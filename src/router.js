import Vue from 'vue'
import Router from 'vue-router'
import CreateRestaurant from './components/CreateRestaurant'
import Home from './components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/createrestaurant',
      name: 'createrestaurant',
      component: CreateRestaurant
    }
  ]
})
