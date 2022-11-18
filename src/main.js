import { createApp } from 'vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {
  faMoon, faSun, faChevronRight, faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import router from './router';
/* add icons to the library */
library.add(faMoon, faSun, faChevronRight, faMagnifyingGlass);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app');
