import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {fb} from '../firebase'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/RestaurantPage/:RestaurantId',
    name: 'RestaurantPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RestaurantPage.vue')
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue'),
    meta: {hideForAuth: true}
  },
  {
    path: '/RegisterPage',
    name: 'RegisterPage',
    component:() => import('../views/RegisterPage.vue'),
    meta: {hideForAuth: true}
  },
  {
    path: '/SettingPage',
    name: 'SettingPage',
    component:() => import('../views/SettingPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/AdminPage',
    name: 'AdminPage',
    component:() => import('../views/AdminPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/RestaurantPage/:RestaurantId/:Contact',
    name: 'QueueingPage',
    component:()=> import('../views/QueueingPage.vue'),
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  fb.auth().onAuthStateChanged(function(user) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!user) {
            next({ path: '/LoginPage' });
        } else {
            next();
          } 
    } else {
        next();
      }
    if (to.matched.some(record => record.meta.hideForAuth)) {
      if (user) {
          next({ path: '/AdminPage' });
      } else {
          next();
        }
    } 
  });
});
export default router
