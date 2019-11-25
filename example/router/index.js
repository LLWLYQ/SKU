import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from '../components/App'
import HomeSelect from '../components/HomeSelect'
import home from '../components/home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    meta: {
    }
  },
  {
    path: '/HomeSelect',
    name: 'HomeSelect',
    component: HomeSelect,
    meta: {
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
