<template>
  <div id="app">
    <div id="nav">
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link> |-->
      <router-link to="/Login">login</router-link>|
      <!--<router-link to="/Register">register</router-link>|-->
      <router-link to="/Transactions">Transactions</router-link>|
      <router-link to="/Inventories">Inventories</router-link>|
     <!--<router-link to="/AddProducts">Add Products </router-link>|-->
    <!--<router-link to="/ByExpired">Delete By Expired</router-link>|-->
    <!-- <router-link to="/SoldProduct">Sold product</router-link>|-->
    <!-- <router-link to="/NewPiecesProduct">New product pieces</router-link>|-->
    <!-- <router-link to="/ListSales">Ventas</router-link>|-->
      
     
    </div>
    <router-view/>

  </div>

</template>


<script>
import Login from '@/views/Login.vue';
import prueva from "./components/prueva.vue";
export default {
   name:'login',
  components: {
    Login,
    prueva,
    
    },
  
}

</script>



<!--<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>-->
