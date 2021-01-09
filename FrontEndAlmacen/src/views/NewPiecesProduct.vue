 <template>
     <div class="signup-form">
        <form v-on:submit.prevent="AddPieces">
            <h2>add new pieces</h2>
            <div class="form-group">
                <label>quanty to add</label>
                <input type="number" v-model="quantity_add" class="form-control" name="product" placeholder="quantity to add" required="required">         	
                    </div>
                    <div class="form-group">
                        <button type="submit"  class="btn btn-success btn-lg btn-block">add new pieces</button>
                    </div>
                </form>                        
            </div>
 </template>
 
 <script>
 import axios from 'axios';

 export default{
     data(){
         return{
             token:'',
             item:'',
             quantity_add:'',
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
            console.log("item pieces "+this.item);
        },
        AddPieces:function(){
            this.header = {
                headers: {
                    Authorization:"Bearer "+this.token
                }
			}         
            console.log("el token es "+this.token);
            console.log("el index del producto "+this.item);
            console.log("qunatity to add "+this.quantity_add);
            var add={
                quantity_add:this.quantity_add
            };
            
			axios.put(this.url+"product/add/"+this.item,add,this.header)
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

    
        

    }

 }
 
 </script>