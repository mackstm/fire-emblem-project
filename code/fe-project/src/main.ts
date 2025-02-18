import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import './assets/animations.css'
import vuetify from './plugins/vuetify'

const app = createApp(App)

app.use(vuetify) 
app.mount('#app') 
