<template>
  <div class="table-wrapper">
      <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6"><h2> <b>Inventory Products </b></h2></div>
                    </div>
                </div>       
                <table class="table table-striped table-hover" >
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">price</th>
                             <th scope="col">code</th>
                            <th scope="col">product</th>
                            <th scope="col">quantity</th>
                            <th scope="col">tax</th>
                            <th scope="col">Created &nbsp; On</th>
                            <th scope="col">update &nbsp;  &nbsp; On</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="(item,index) in inventories" v-bind:key="index" ata-status="activate">
                            <td>{{item.id}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.product.code}}</td>
                            <td>{{item.product.name}}</td>
                            <td>{{item.quantity}}</td>
                            <td>{{item.tax}}</td>
                            <td>{{item.created_at}}</td>
                            <td>{{item.updated_at}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>       
</template>

<script>
import axios from 'axios';

export default {
   
    data(){
        return{
            inventories:[],
            url:"https://warehousev1.herokuapp.com/api/v1/",
        }
    },
    mounted(){
        this.AllInventories();
    },
    methods:{
        
        AllInventories() {
            axios.get(this.url+"inventory")
            .then(reponse=>{
                this.inventories=reponse.data.inventories;
                console.log("inventarios");
                console.log(reponse.data);
                console.log("estos son los dato en el arreglo ");
                console.log(this.inventories);
            })
            .catch(e=>{
                console.log("error "+e.reponse);
                
            })
            
        }
    
    },

}
</script>

<style >

</style>