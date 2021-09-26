import { createStore } from 'vuex'

import authModule from './modules/auth/index.js';
import annotations from './modules/annotations/index.js';
import ontologies from './modules/ontologies/index.js';



export default createStore({
  modules:{
    auth: authModule,
    annotations: annotations,
    ontologies: ontologies
  },
})
