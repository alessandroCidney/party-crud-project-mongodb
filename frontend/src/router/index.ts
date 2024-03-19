
import { createRouter, createWebHistory } from 'vue-router'

import { useMainStore } from '@/stores/main'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/newparty',
      name: 'NewParty',
      component: () => import('../views/NewPartyView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/editparty/:id',
      name: 'EditParty',
      component: () => import('../views/EditPartyView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/party/:id',
      name: 'Party',
      component: () => import('../views/PartyView.vue'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const mainStore = useMainStore()

    if (mainStore.authenticated === false) {
      next({
        path: '/login',
        query: { nextUrl: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
