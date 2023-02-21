import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import Sidebar from '../views/Sidebar.vue'
import Process_Route from '../views/Home/Process_Route.vue'
import Process_RouteEdit from '../views/Home/Process_RouteEdit.vue'
import Product_Query from '../views/Home/Product_Query.vue'
import UserInfo from '../views/Home/UserInfo.vue'
import Analysize from '../views/Home/Analysize.vue'
import Register from '../views/register.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        { path: "/", redirect: "/Home/Process_Route" },
        {
          path: "/Home/Process_Route",
          name: "Process_Route",
          component: Process_Route,
        },
        {
          path: "/Home/Product_Query",
          name: "Product_Query",
          component: Product_Query,
        },
        {
          path: "/Home/Process_RouteEdit",
          name: "Process_RouteEdit",
          component: Process_RouteEdit,
        },
        {
          path: "/user",
          name: "UserInfo",
          component: UserInfo,
        },
        {
          path: "/analysize",
          name: "Analysize",
          component: Analysize
        },
      ],
    },
    {
      path: '/Navbar',
      name: 'Navbar',
      component: () => import('../views/Navbar.vue')
    },
    {
      path: '/loginr',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/getinfo',
      name: 'getinfo',
      component: () => import('../views/getinfo.vue')
    },

    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/side',
      name: 'Sidebar',
      component: Sidebar
    },

  ]
})

export default router
