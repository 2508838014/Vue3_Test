import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import Sidebar from '../views/Sidebar.vue'
import Process_Route from '../views/Home/Process_Route.vue'
import Process_RouteEdit from '../views/Home/Process_RouteEdit.vue'
import Product_Query from '../views/Home/Product_Query.vue'
import Register from '../views/register.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {path: "/", redirect: "/Home/Process_Route"},
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
      ],
    },
    {
      path: '/Navbar',
      name: 'Navbar',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Navbar.vue')
      },
      {
        path: '/loginr',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/login.vue')
        },
        {
          path: '/register',
          name: 'register',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: Register
          },
        {
          path: '/getinfo',
          name: 'getinfo',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/getinfo.vue')
          },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
