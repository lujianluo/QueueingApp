import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueFirestore from 'vue-firestore'
import {fb}   from './firebase'
require('firebase/firestore')

Vue.config.productionTip = false
Vue.use(VueFirestore)

let app = '';

fb.auth().onAuthStateChanged(function() {
  if(!app){
    new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
});