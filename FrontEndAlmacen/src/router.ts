import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue'
import Admin from './views/Admin.vue';
import Products from './views/Products.vue';
import Transactions from './views/Transactions.vue';
import Inventories from './views/Inventories.vue';
import AddProducts from './views/AddProducts.vue';
import SoldProduct from  './views/SoldProduct.vue';
import ByExpired from './views/ByExpired.vue';
import NewPiecesProduct from  './views/NewPiecesProduct.vue';
import ListSales from './views/ListSales.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/',name: 'home',component: Home},
    { path: '/about', name: 'about',component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),},
    { path:'/Login',name:'Login',component: Login},
    { path:'/Register',name:'Register',component:Register},
    { path:'/Admin/:rol',name:'Admin',component:Admin},
    { path:'/Products/:rol',name:'Products',component:Products},
    { path:'/Transactions',name:'Transactions',component:Transactions},
    { path:'/AddProducts',name:'AddProducts',component:AddProducts},
    { path:'/Inventories',name:'Inventories',component:Inventories},
    { path:'/SoldProduct',name:'SoldProduct',component:SoldProduct},
    { path:'/ByExpired',name:'ByExpired',component:ByExpired},
    { path:'/NewPiecesProduct',name:'NewPiecesProduct',component:NewPiecesProduct},
    { path:'/ListSales',name:'ListSales',component:ListSales},

  ],

});
