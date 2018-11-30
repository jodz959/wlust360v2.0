import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import TripSummary from '@/components/TripSummary'

Vue.use(Router)
import auth from './../mw/auth'

//auth.checkAuth(this);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path:'/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard/:trip',
      name: 'TripSummary',
      component: TripSummary,
      meta: { requiresAuth: true }
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

   //TODO: pass router.app as context
    if(auth.checkAuth(router.app.$session.get('jwt'))) {
      console.log('user is authenticated')
      next()
    } else {
      console.log('redirecting to login')
      next({
        path: '/login',
        query: { st: 'unauthorized' } 
      })
    }
  } else {
   //path does not require auth 
   next()
  }
})

export default router
