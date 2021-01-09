import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import firebase from 'firebase';
import 'firebase/messaging';
//import Login from './Login.vue';

//import BootstrapVue from 'bootstrap-vue'
//Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

var firebaseConfig = {
  apiKey: "AIzaSyCPE4RRFcE74y2cjGvPEpP-KSzRcd5lUEs",
  authDomain: "notificaciones-fd028.firebaseapp.com",
  databaseURL: "https://notificaciones-fd028.firebaseio.com",
  projectId: "notificaciones-fd028",
  storageBucket: "notificaciones-fd028.appspot.com",
  messagingSenderId: "530741980753",
  appId: "1:530741980753:web:6c96ab414942e83f445270",
  measurementId: "G-E3G3E1W0KF",


};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const messaging = firebase.messaging();
messaging.usePublicVapidKey('BHrxigVVighXHPMp0W16fcoBqcuIKlI-f9JVqat24InHvwpL9zlJNMTEcKiJjJhwjSNb5Yi6P_ERvtnVy20NRx8')

/*messaging.requestPermission().then(()=> {
  console.log("TENGO PERMISOS")
  messaging.getToken().then((token)=> {
    console.log(token)
    localStorage.setItem('token_navegador', token);
  });

}).catch((err)=> {

  console.log('unable to get permission to notify',err);

});*/

messaging.requestPermission().then(() => {
  console.log('Notificacion permission granted');

  messaging.getToken().then(token => {
    if (token) {
      console.log("token: " + token);
      localStorage.setItem('token_navegador', token);
    }
  }).catch(err => {
    console.log(err);
  });
  
}).catch((err) => {
  console.log('Unable to get permission to notify', err);
});


export const db=firebase.firestore();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
