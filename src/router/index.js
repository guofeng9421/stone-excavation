import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  //登录路由
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/logins/LogIn')
  },
  //大屏展示路由
  {
    path: '/',
    name: 'home',
    redirect: "/index",
    hidden: true,
    component: () => import('@/views/home/HomeView.vue'),
    children: [{
      path: '/index',
      name: 'Index',
      component: () => import('@/views/home/Content/HomeContent.vue')
    }]
  },
  //后台管理路由
  {
    path: '/BackstageManagement',
    name: '质量管理',
    redirect: "/BackstageManagement/input",
    component: () => import('@/views/BackstageManagements/BackstageManagement.vue'),
    children: [
      //质量路由
      {
        path: '/BackstageManagement/quality',
        name: "质量巡检",
        component: () => import('@/views/BackstageManagements/backendModule/QualityInspection.vue')
      }
    ]
  },
  //进度管理
  {
    path: '/BackstageManagement',
    name: '进度管理',
    
    component: () => import('@/views/BackstageManagements/BackstageManagement.vue'),
    children: [
      //进度录入
      {
        path: '/BackstageManagement/input',
        name: '进度录入',
        component: () => import('@/views/BackstageManagements/backendModule/progressEntry.vue')
      }
    ]
  },
  //施工清单
  {
    path: '/BackstageManagement',
    name: '施工清单',
    component: () => import('@/views/BackstageManagements/BackstageManagement.vue'),
    children: [
      //质量路由 待定
      {
        path: '/BackstageManagement/quality',
        name: "",
        component: () => import('@/views/BackstageManagements/backendModule/QualityInspection.vue')
      }
    ]
  },
  //施工资料
  {
    path: '/BackstageManagement',
    name: '施工资料',
    component: () => import('@/views/BackstageManagements/BackstageManagement.vue'),
    children: [
      //质量路由 待定
      {
        path: '/BackstageManagement/quality',
        name: "",
        component: () => import('@/views/BackstageManagements/backendModule/QualityInspection.vue')
      }
    ]
  },
  //施工成本
  {
    path: '/BackstageManagement',
    name: '施工成本',
    component: () => import('@/views/BackstageManagements/BackstageManagement.vue'),
    children: [
      //质量路由 待定
      {
        path: '/BackstageManagement/quality',
        name: "",
        component: () => import('@/views/BackstageManagements/backendModule/QualityInspection.vue')
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router