import { createApp } from 'vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {
  faMoon, faSun, faChevronRight, faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

library.add(faMoon, faSun, faChevronRight, faMagnifyingGlass);
const pinia = createPinia();
/* add icons to the library */

createApp(App).component('FontAwesomeIcon', FontAwesomeIcon).use(pinia).use(router)
  .mount('#app');
