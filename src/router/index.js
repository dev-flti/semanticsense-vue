import { createRouter, createWebHistory } from 'vue-router'

import AnnotationPool from '../views/annotations/AnnotationPool.vue'
import Login from '../views/auth/Login.vue'

import store from '../store/index'




const routes = [
  { path: '/', redirect: '/annotation-pool' },
  { path: '/login', name: 'login' , component: Login },
  { path: '/annotation-pool',  component: AnnotationPool, meta: { requiredAuth: false } },
  { path: '/annotation-create',  component: () => import("../views/annotations/AnnotationCreate.vue"), props: true, meta: { requiredAuth: false }},
  { path: '/upload-ontology', component: () => import("../views/ontologies/UploadOntology.vue"), meta: { requiredAuth: false }}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to,from, next) => {
  if(!store.getters["auth/getAuthenticationData"].token){
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");
      if(access_token){
          const data = {
              access_token: access_token,
              refresh_token: refresh_token
          };
          store.commit('auth/saveAuthenticationData', data);
      }
  }
  
  const auth = store.getters["auth/isTokenActive"];

  if(to.fullPath == "/"){
      return next();
  }
  else if(auth && !to.meta.requiredAuth){
      return next({path:"/annotation-pool"});
  }
  else if(!auth && to.meta.requiredAuth){
      return next({path: '/login'});
  }

  return next();
});


export default router


/* 
let auth = store.getters["auth/isTokenActive"];

  console.log("auth:")
  console.log(auth)
  // if (!auth) {
  //   const authData = store.getters["auth/getAuthenticationData"];
  //   if (authData.token) {
  //     const payload = {
  //       refresh: authData.refreshToken,
  //       returnSecureToken: true
  //     };
  //     console.log("payload:")
  //     console.log(payload)
  //     const refreshResponse = await axios.post(
  //       "http://localhost:8000/api/user/token-refresh/",
  //       payload
  //     );
  //     console.log("response:")
  //     console.log(refreshResponse.data)
  //     store.commit("auth/saveAuthenticationData", {
  //       access_token: refreshResponse.data.access
  //     });
  //     auth = true;
  //   }
  // }
  
  if(to.fullPath == "/"){
      return next();
  }
  else if(auth && !to.meta.requiredAuth){
      return next({path:"/annotation-pool"});
  }
  else if(!auth && to.meta.requiredAuth){
      return next({path: '/login'});
  }
  return next();
*/