import { createRouter, createWebHistory } from 'vue-router'

import AnnotationPool from '../views/annotations/AnnotationPool.vue'

import store from '../store/index.js';



const routes = [
  { path: '/', redirect: '/annotation-pool' },
  { path: '/annotation-pool',  component: AnnotationPool},
  { path: '/my-annotations',  component: AnnotationPool},
  { path: '/my-annotations/:id',  component: null},
  { path: '/annotation-pool/:id', component: () => import("../views/annotations/AnnotationCreate.vue"), props: true},
  { path: '/annotation-create',  component: () => import("../views/annotations/AnnotationCreate.vue"), props: true/*  meta:{requireAuth: true} */},
  { path: '/user-settings',  component: null, meta:{requireAuth: true}},
  { path: '/docs',  component: null},
  { path: '/auth',  component: null},
  { path: '/contact', component: null },
  {
    //for lazyloading component
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/general/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(function(to, _, next){
  if(to.meta.requireAuth && !store.getters.isAuthenticated){
    next('/auth');
  } else if (to.meta.requireUnauth && store.isAuthenticated){
    next('/annotation-pool');
  }else {
    next();
  }
})

export default router
