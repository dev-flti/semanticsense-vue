import { createRouter, createWebHistory } from 'vue-router'

import AnnotationPool from '../views/annotations/AnnotationPool.vue'

import store from '../store/index.js';



const routes = [
  { path: '/', redirect: '/annotation-pool' },
  { path: '/annotation-pool',  component: AnnotationPool},
  { path: '/annotation-pool/:id', component: () => import("../views/annotations/AnnotationDetail.vue"), props: true},
  { path: '/annotation-create',  component: () => import("../views/annotations/AnnotationCreate.vue"), props: true},
  { path: '/upload-ontology', component: () => import("../views/ontologies/UploadOntology.vue")}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
