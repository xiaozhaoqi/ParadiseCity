import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import TDesign from 'tdesign-mobile-vue';
import 'tdesign-mobile-vue/es/style/index.css';

import App from './App.vue'
import router from './router'
import hevueImgPreview from 'hevue-img-preview'
import VueClipboard from 'vue3-clipboard'
const app = createApp(App)
app.use(hevueImgPreview)
app.use(createPinia())
app.use(router)
app.use(TDesign);
app.use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
});

app.mount('#app')
