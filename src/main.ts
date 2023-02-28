import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../../node_modules/element-plus/es/components/message-box/style'
import '../../node_modules/element-plus/es/components/message/style'
// import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
