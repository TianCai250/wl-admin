import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import router from './router'
import install from './install'

const pinia = createPinia();
createApp(App).use(router).use(ElementPlus).use(pinia).use(install).mount('#app')
