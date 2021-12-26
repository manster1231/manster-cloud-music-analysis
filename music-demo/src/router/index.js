import Vue from 'vue'
import VueRouter from 'vue-router'
import AgePage from '../views/AgePage.vue'
import CityPage from '../views/CityPage.vue'
import CommentsPage from '../views/CommentsPage.vue'
import TimePage from '../views/TimePage.vue'
import DatePage from '../views/DatePage.vue'
import GenderPage from '../views/GenderPage.vue'
import VipPage from '../views/VipPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: AgePage
  },
  {
    path: '/city',
    component: CityPage
  },
  {
    path: '/comments',
    component: CommentsPage
  },
  {
    path: '/time',
    component: TimePage
  },
  {
    path: '/date',
    component: DatePage
  },
  {
    path: '/gender',
    component: GenderPage
  },
  {
    path: '/vip',
    component: VipPage
  }
]

const router = new VueRouter({
  routes
})

export default router
