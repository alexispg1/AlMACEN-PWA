<template>
        <div class="signup-form">
                <form v-on:submit.prevent="onSubmit">
                        <h2>Product</h2>

                        <div class="form-group">
                                 <input type="text" v-model="product.name" class="form-control" name="product" placeholder="product name" required="required">         	
                        </div>

                        <div class="form-group">
                                <label>quantity of the product : </label></br> 
                                <input v-model="product.quantity" type="number" value="1" required="required">
                        </div>      
                        <div class="form-group">
                                <label>price of the product : </label> </br>
                                <input type="number"  v-model="product.price" value="1" step=".10" required="required">                               
                        </div> 
                        <div class="form-group">
                                <label>tax of the product : </label> </br>
                                <input type="number" v-model="product.tax" value="0" required="required" step="0.1">                               
                        </div>  

                        <div class="form-group">
                                <label>description of the product </label>
                                <textarea rows="2" v-model="product.description" cols="45"></textarea>         	
                        </div >
                        <div class="form-group">
                                <label>choose a image </label>
                               	<input type="file" @change="chooseFile($event)"> 
                        </div>
                        
                        <div class="form-group">
                                 <button type="submit" @:click="cambiar" class="btn btn-success btn-lg btn-block">add product</button>
                        </div>
                </form>
                
        </div>
                                   
        <!--<b-form-group>
<b-form-file @change="chooseFile($event)" class="mt-3"></b-form-file> 
                <input type="file" >
        </b-form-group>-->

</template>

<script>
import axios from 'axios';
export default{

	data(){
		return{
			url:"https://warehousev1.herokuapp.com/api/v1/",
			product:{
				name:'',
				description:'',
				image:'',
				quantity:'',
				price:'',
				tax:'',	
			},
			token:'',
			header:''
		}
	},
	mounted(){
		this.token = localStorage.getItem("token").split('"', (3))
		console.log("perros xd "+this.token);

	},

	methods:{
		chooseFile(event){
			this.product.image = event.target.files[0];
			console.log(this.product.image);
		},
		onSubmit() {
			this.token = localStorage.getItem("token").split('"', (3))
			this.token = this.token[1]
			console.log("token resultante "+this.token);
			this.header = {
				headers: {
					Authorization: "Bearer " + this.token
				}
			}
			let formData = new FormData();
			console.log("name "+this.product.name);
			console.log("description "+this.product.description);
			console.log("image "+this.product.image);
			console.log("qunatity "+this.product.quantity);
			console.log("price  "+this.product.price);
			console.log("tax "+this.product.tax);

			console.log("este es el header ");
			console.log(this.header);

			console.log("este es el url  ");
			console.log(this.url);

			formData.append('name', this.product.name);
			formData.append('description', this.product.description);
			formData.append('image', this.product.image);
			formData.append('quantity', this.product.quantity);
			formData.append('price', this.product.price);
			formData.append('tax', this.product.tax);

			console.log("este es el formdaa ");
			console.log(formData);
			//axios.post(this.url+"sales/"+item.id,sales,this.header)
			axios.post(this.url+'product',formData, this.header)
			.then((response) => {
				console.log("respuesta del servidor")
				console.log(response.data)
				this.cambiar();
			})
			.catch((error) => {
				alert("no tienes permisos de usuarios "+error);
                console.log("estoy como cajero ");
                localStorage.setItem('token', JSON.stringify(this.token));
                this.$router.push('/Products/'+2);
			});
		},
		cambiar(){	
			var user_rol=1;
			console.log("AAA user rol "+user_rol);
			console.log("AAA token "+this.token);
			this.$router.push('/Products/'+user_rol);
			localStorage.setItem('token', JSON.stringify(this.token));
			console.log("hola mundo");
		},

	},



}




</script>




<style>
        
    .form-control{
		height: 40px;
		box-shadow: none;
		color: #969fa4;
	}
	.form-control:focus{
		border-color: #5cb85c;
	}
    .form-control, .btn{        
        border-radius: 3px;
    }
	.signup-form{
		width: 400px;
		margin: 0 auto;
		padding: 30px 0;
	}
	.signup-form h2{
		color: #636363;
        margin: 0 0 15px;
		position: relative;
		text-align: center;
    }
	.signup-form h2:before, .signup-form h2:after{
		content: "";
		height: 2px;
		width: 30%;
		background: #d4d4d4;
		position: absolute;
		top: 50%;
		z-index: 2;
	}	
	.signup-form h2:before{
		left: 0;
	}
	.signup-form h2:after{
		right: 0;
	}
    .signup-form .hint-text{
		color: #999;
		margin-bottom: 30px;
		text-align: center;
	}
    .signup-form form{
		color: #999;
		border-radius: 3px;
    	margin-bottom: 15px;
        background: #f2f3f7;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 30px;
    }
	.signup-form .form-group{
		margin-bottom: 20px;
	}
	.signup-form input[type="checkbox"]{
		margin-top: 3px;
	}
	.signup-form .btn{        
        font-size: 16px;
        font-weight: bold;		
		min-width: 140px;
        outline: none !important;
    }
	.signup-form .row div:first-child{
		padding-right: 10px;
	}
	.signup-form .row div:last-child{
		padding-left: 10px;
	}    	
    .signup-form a{
		color: #fff;
		text-decoration: underline;
	}
    .signup-form a:hover{
		text-decoration: none;
	}
	.signup-form form a{
		color: #5cb85c;
		text-decoration: none;
	}	
	.signup-form form a:hover{
		text-decoration: underline;
	} 

</style>


