import 'bootstrap/dist/css/bootstrap.css';


import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BaseCard from './components/base/BaseCard.vue';
import BaseButton from './components/base/BaseButton.vue';
import BaseBadge from './components/base/BaseBadge.vue';
import BaseSpinner from './components/base/BaseSpinner.vue';
// import BaseDialog from './components/ui/BaseDialog.vue';

const BaseDialog = defineAsyncComponent(() => import('./components/base/BaseDialog.vue'))
createApp(App)
    .use(store)
    .use(router)
    .component('base-card', BaseCard)
    .component('base-btn', BaseButton)
    .component('base-badge', BaseBadge)
    .component('base-spinner', BaseSpinner)
    .component('base-dialog', BaseDialog)
    .mount('#app')

import 'bootstrap/dist/js/bootstrap.js';
