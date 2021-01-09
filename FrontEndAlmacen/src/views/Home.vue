<template>
  <div class="home">
   
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
//import Login from '@/views/Login.vue';

@Component({
  components: {
    HelloWorld,
    //Login
  },
})
export default class Home extends Vue {}
</script>
