
<template>
	<div class="page-content">
		<div class="form-v5-content">
			<form v-on:submit.prevent="register" class="form-detail" >
				<h2>User Registration</h2>
				<div class="form-row">
					<label for="full-name">user name </label>
					<input type="text" v-model="user.username" name="full-name" id="full-name" class="input-text" placeholder="Your Name" required>
					<i class="fas fa-user"></i>
				</div>
				<div class="form-row">
					<label for="your-email">Your Email</label>
					<input type="text"  v-model="user.email" name="your-email" id="your-email" class="input-text" placeholder="Your Email" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}">
					<i class="fas fa-envelope"></i>
				</div>
				<div class="form-row">
					<label for="password">Password</label>
					<input type="password" v-model="user.password" name="password" id="password" class="input-text" placeholder="Your Password" required>
					<i class="fas fa-lock"></i>
				</div>
				<select v-model="selected">
					<option disabled value="">Please select one</option>
					<option>administrator</option>
					<option>cashier</option>
					</select>
				<div class="form-row-last">
					<input type="submit" name="register" class="register" value="Register">
					
				</div>
			</form>
		</div>
	</div>

</template>

<script>
import axios from 'axios';
export default{
	name:'register',
	components:{

	},
	data(){
		return{
			api_url:'https://warehousev1.herokuapp.com/api/v1/',
			user:{
				username:'',
				email:'',
				password:'',
				rol:'',
			},
			selected:'',
		}

	},
	methods:{
		register:function(){
			console.log("user name "+this.user.username)
			console.log("user email "+this.user.email)
			console.log("user password "+this.user.password)
			console.log("user rol "+this.user.rol)
			console.log("selected "+this.selected)
			if(this.selected==="administrator"){
				this.user.rol=1;
				console.log("perro "+this.user.rol);
			}
			if(this.selected==="cashier"){
				this.user.rol=2;
				console.log("perro 1 "+this.user.rol)
			}
			axios.post(this.api_url+"user/register",this.user)
			.then(response => {
				console.log(response.data);

				if(response.data.user.rol===1){
					console.log("paso perro xxxxx v,: ");
					this.addTokenNav();
					localStorage.setItem('token', JSON.stringify(response.data.token.token));
					this.$router.push('/Admin/'+response.data.user.rol);
				}
				else{
					this.$router.push('/Products/'+response.data.user.rol);
					var token=response.data.token.token;
					localStorage.setItem('token', JSON.stringify(token));
				}
			}).catch(e => {
				alert("el error es  "+e.response);
				})
		},
		addTokenNav:function(){
			var token_nav=localStorage.getItem('token_navegador'); 
			console.log("Admin token del navegador xxxx  "+token_nav);
			var adminToken=({
				token_nav:token_nav
			});
			console.log("XXXXX "+adminToken.token_nav);
			axios.post(this.api_url+"user/admin",adminToken)
			.then(response=>{
				console.log("token_nav guardado");
				console.log(response.data);
			})
			.catch(error=>{
				console.log(error.response);
			});
		}


	}

}



</script>




<style >
.form-row-last  button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
body {
  background: #76b852; /* fallback for old browsers */
  background: -webkit-linear-gradient(right, #76b852, #8DC26F);
  background: -moz-linear-gradient(right, #76b852, #8DC26F);
  background: -o-linear-gradient(right, #76b852, #8DC26F);
  background: linear-gradient(to left, #76b852, #8DC26F);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;      
}
/*body {
	margin:  0;
}*/
.page-content {
	width: 100%;
	margin:  0 auto;
	/*background: #5eb2b3;*/
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	-o-justify-content: center;
	-ms-justify-content: center;
	-moz-justify-content: center;
	-webkit-justify-content: center;
	align-items: center;
	-o-align-items: center;
	-ms-align-items: center;
	-moz-align-items: center;
	-webkit-align-items: center;
}
.form-v5-content  {
	background: #fff;
	width: 670px;
	border-radius: 8px;
	-o-border-radius: 8px;
	-ms-border-radius: 8px;
	-moz-border-radius: 8px;
	-webkit-border-radius: 8px;
	margin: 175px 0;
	font-family: 'Roboto', sans-serif;
	color: #333;
	font-weight: 400;
	position: relative;
	font-size: 18px;
}
.form-v5-content .form-detail {
	padding: 30px 45px 30px 45px;
	position: relative;
}
.form-detail h2 {
	font-weight: 700;
	font-size: 25px;
	text-align: center;
	position: relative;
	padding: 3px 0 20px;
	margin-bottom: 40px;
}
.form-detail h2::after {
	background: #3786bd;
	width: 50px;
	height: 2px;
	content: "";
	position: absolute;
	top: 100%;
	left: 50%;
    transform: translateX(-50%);
    -o-transform: translateX(-50%);
	-ms-transform: translateX(-50%);
	-moz-transform: translateX(-50%);
	-webkit-transform: translateX(-50%);
}
.form-detail .form-row {
	position: relative;
}
.form-detail .form-row-last {
	text-align: center;
}
.form-detail label {
	display: block;
	font-size: 18px;
	padding-bottom: 10px;
}
.form-detail .input-text {
	margin-bottom: 26px;
}
.form-detail input {
	width: 94.5%;
    padding: 10.5px 15px;
    border: 1px solid #e5e5e5;
    appearance: unset;
    -moz-appearance: unset;
    -webkit-appearance: unset;
    -o-appearance: unset;
    -ms-appearance: unset;
    outline: none;
    -moz-outline: none;
    -webkit-outline: none;
    -o-outline: none;
    -ms-outline: none;
    border-radius: 4px;
	-o-border-radius: 4px;
	-ms-border-radius: 4px;
	-moz-border-radius: 4px;
	-webkit-border-radius: 4px;
	font-family: 'Roboto', sans-serif;
	font-weight: 400;
	font-size: 18px;
}
.form-detail input:focus {
	border: 1px solid #b3b3b3;
}
.form-detail .register {
	font-size: 18px;
	color: #fff;
	background: #4CAF50;
	border-radius: 5px;
	-o-border-radius: 5px;
	-ms-border-radius: 5px;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	width: 180px;
	box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.2);
	-o-box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.2);
	-ms-box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.2);
	-moz-box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.2);
	-webkit-box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.2);
	border: none;
	margin: 19px 0 40px;
	cursor: pointer;
}
.form-detail .register:hover {
	background: #43A047;
}
.form-detail .form-row-last input {
	padding: 14px;
}
.form-detail i {
	font-size: 14px;
	color: #999;
	right: 15px;
	top: 50%;
	transform: translateX(-50%);
	position: absolute;
}
input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #999;
  font-size: 16px;
}
input::-moz-placeholder { /* Firefox 19+ */
  color: #999;
  font-size: 16px;
}
input:-ms-input-placeholder { /* IE 10+ */
  color: #999;
  font-size: 16px;
}
input:-moz-placeholder { /* Firefox 18- */
  color: #999;
  font-size: 16px;
}

/* Responsive */
@media screen and (max-width: 767px) {
	.form-v5-content {
	    margin: 175px 20px;
	}
}


</style>
