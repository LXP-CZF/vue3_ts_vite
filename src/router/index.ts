import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// 路由记录，这个跟vue2中用法一致，就不做过多解释了
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/HomeVr.vue'),
    alias: '/home',
    meta: {
      title: '首页'
    }
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
