<template>
    <div class="signup-form">
        <form v-on:submit.prevent="Delete">
            <h2>Delete Product</h2>
            <div class="form-group">
                <label>quanty to delete</label>
                <input type="number" v-model="quantity_remove" class="form-control" name="product" placeholder="quantity to delete" required="required">         	
            </div>
            <div class="form-group">
                <button type="submit"  class="btn btn-success btn-lg btn-block">delete by expired</button>
            </div>
        </form>
                
    </div>
    
</template>

<script>
import axios from 'axios'

export default{
    data(){
        return{
            token:'',
            item:'',
            quantity_remove:'',
            url:'https://warehousev1.herokuapp.com/api/v1/',
        }
	},
    mounted(){
      this.start();
    },
    methods:{
        start:function(){
            this.token=JSON.parse(localStorage.getItem("token")); 
            console.log("el token del user "+this.token);
            this.item=JSON.parse(localStorage.getItem("item")); 
			console.log("el id a borrar "+this.item);
        },
        Delete:function(){
            this.header = {
				headers: {
                    Authorization:"Bearer "+this.token
                }
			}           
            console.log("el token es "+this.token);
            console.log("el index del producto "+this.item);
            console.log("qunatity to remove "+this.quantity_remove);

            var remove={
				quantity_remove:this.quantity_remove
            };
            
			axios.put(this.url+"product/remove/"+this.item,remove,this.header)
			.then(response=>{
                console.log(response.data);
                localStorage.setItem('token', JSON.stringify(this.token));
                this.$router.push('/Products/'+1);
			})
			.catch(e=>{
                alert("no tienes permisos de usuarios "+e);
                console.log("estoy como cajero ");
                localStorage.setItem('token', JSON.stringify(this.token));
                this.$router.push('/Products/'+2);
			})
        },
    
    },

}





</script>

