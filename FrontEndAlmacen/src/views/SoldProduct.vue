<template>
 <div class="signup-form">
        <form  v-on:submit.prevent="DeleteProduct">
            <h2> Sell  </h2>
            <div class="form-group">
                <label>quanty to sell</label>
                <input type="number" v-model="sell.quantity"  class="form-control" name="product" placeholder="quantity to delete" required="required">         	
            </div>
            <div class="form-group">
                <label>discount of the product</label>
                <input type="number"  v-model="sell.discount" class="form-control" name="product" placeholder="discount of the product" required="required">         	
            </div>
             <div class="form-group">
                <label>paymenth method</label>
                <select v-model="selected" >
					<option disabled value="">Please select one</option>
					<option>credit card</option>
					<option>debit</option>
				</select>
                <div class="form-group">
                    <button type="submit"  class="btn btn-success btn-lg btn-block">sell product</button>
                </div>
                     	
            </div>
        </form>                
    </div>
</template> 
 
<script>
import axios from 'axios'

export default {

    data(){
        return{
            token:'',
            item:'',
            url:'https://warehousev1.herokuapp.com/api/v1/',

            sell:{
                quantity:'',
                discount:'',
                status:'',
                paymenth_method:'',
            }
            ,selected:''
        }
    },
    mounted(){
        this.satart();
    },
    methods:{
        satart:function() {
            this.token=JSON.parse(localStorage.getItem("token")); 
            console.log("el token del user "+this.token);
            this.item=JSON.parse(localStorage.getItem("item")); 
			console.log("el id a borrar "+this.item);
        },
        DeleteProduct:function () {
            this.header = {
                headers: {
                    Authorization:"Bearer "+this.token
				}
            }
            
            if(this.selected==="credit card"){
				console.log("logeado como admin");
                this.sell.paymenth_method=1;
                this.sell.status=1;
			}
			if(this.selected==="debit"){
				console.log("logeado como cajero");
                this.sell.paymenth_method=2;
                this.status=1;
			}
            
            console.log(this.item);
            console.log(this.sell.quantity);
            console.log(this.sell.discount);
            console.log(this.sell.status);
            console.log(this.sell.paymenth_method);

            var remove={
                quantity:this.sell.quantity,
                discount:this.sell.discount,
                status:this.sell.status,
                paymenth_method:this.sell.paymenth_method,

            }
            axios.post(this.url+"sales/"+this.item,remove,this.header)
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
            
        }


    }


}
</script> 
