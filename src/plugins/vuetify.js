import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#607d8b',
    secondary: '#1565C0',
    accent: '#ff5722',
    error: '#f44336',
    warning: '#ff9800',
    info: '#3f51b5',
    success: '#009688',
    darkbg: '#263238'
    }
})
