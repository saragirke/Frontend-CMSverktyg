import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactView from '../views/ContactView.vue'
import NewsView from '../views/NewsView.vue'
import ServiceView from '../views/ServiceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Start'
      }
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView,
      meta: {
        title: 'Nyheter'
      }
    }
    ,
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: {
        title: 'Kontakt'
      }
    }
    ,
    {
      path: '/service',
      name: 'service',
      component: ServiceView,
      meta: {
        title: 'Våra tjänster'
      }
    }
    ,
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'Våra tjänster'
      }
    }
  ]
})


// Dynamiska titles
router.beforeEach((to, from) => {
  document.title = to.meta?.title ?? 'Default Title'
})

export default router
