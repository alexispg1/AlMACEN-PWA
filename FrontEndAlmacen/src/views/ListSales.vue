<template>
    <body>
        <div class="container">
            <div class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2><b>List sales </b></h2>
                        </div>
                    </div>
                </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>image</th>
                        <th>name</th>
                        <th>quantity</th>
                        <th>discount</th>
                        <th>total</th>
                        <th>pay method</th>
                        <th>cancel</th>
                        <th>RequestCancel</th>
                    </tr>
                </thead>
                
                <tbody>					
                    <tr v-for="(item,index) in sales" v-bind:key="index" >
                        <td>{{item.id}}</td>
                        <td class="w-35">
                            <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg" class="img-fluid img-thumbnail" alt="Sheep">
                        </td>        
                        <td>{{item.product.name}}</td>
                        <td>{{item.quantity}}</td>
                        <td>{{item.discount}}</td>
                        <td>{{item.total}}</td>
                        <td>{{item.payment_method}}</td>
                        
                      
                        <td>
                            <button v-on:click="cancel(item)" >cancel </button> 
                        </td> 
                        <td>
                            <button  v-on:click="RequestCancel(item)" >request cancelation </button> 
                        </td> 						  
                    </tr> 
                </tbody>
            </table>
            <div class="clearfix">
                <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                <ul class="pagination">
                    <li class="page-item disabled"><a href="#">Previous</a></li>
                    <li class="page-item"><a href="#" class="page-link">1</a></li>
                    <li class="page-item"><a href="#" class="page-link">Next</a></li>
                </ul>
            </div>
        </div>
    </div>
</body>
            
</template>


<script>
import axios from 'axios'
import Axios from 'axios';
export default {
    data(){
        return{
            token:'',
			rol:'',
			header:'',
			sales:[],
			url:'',
            FotoUrl: '',
            tokenfirebase:'key=AAAAe5Kv7lE:APA91bG7wg5wdOCAeFLaaXRNodUYJwrWOC9Mo_RH8F7CCSIx48CxmC1Qe0dpSZmwM5ZXK0rhw-C1u0Azg666NpkVz0HuCSAYJxhChlYI-y4uxei51Z6k02G-gkNql43keyRnVlZ95kzR',
                     
       }
	},
    mounted(){
      this.start();
    },
    methods: {
		start(){
			this.token=JSON.parse(localStorage.getItem("token")); 
			console.log("el vedadero token "+this.token);
			this.url="https://warehousev1.herokuapp.com/api/v1/"
			this.FotoUrl = 'https://warehousev1.herokuapp.com';
			console.log("url "+this.url);
			console.log("fotourl "+this.FotoUrl);
			axios.get(this.url+"sales")
            .then(reponse=>{
				this.sales=reponse.data.sales;
				console.log("respuesta del servidor ");
				console.log(reponse.data);
				console.log("vector de products ")
				console.log(this.sales[0].product.name);
            })
            .catch(e=>{
                console.log("error "+e.reponse); 
            })
		},
		cancel(item){
            this.header = {
                headers: {
                    Authorization:"Bearer "+this.token
				}
            } 
            console.log(item)
            console.log(" item "+item);
            console.log("id "+item.id);
            console.log(" quantity "+item.quantity);
            console.log(" discount "+item.discount);
            console.log(" status "+item.status);
            console.log(" paymenth metod "+item.payment_method);
            var status=2;
            var remove={
                quantity:item.quantity,
                discount:item.discount,
                status:status,
                paymenth_method:item.payment_method,
            }
            var id=item.id;

            console.log("header "+this.token);
            console.log("id "+id);
            axios.post(this.url+"sales/"+id,remove,this.header)
            //axios.post(this.url+"sales/"+this.item,remove,this.header)
			.then(response=>{
                console.log(response.data);
                localStorage.setItem('token', JSON.stringify(this.token));
                this.$router.push('/Products/'+1);
			})
			.catch(e=>{
				alert("no tienes permisos de admin "+e);
                console.log("estoy como cajero ");
                localStorage.setItem('token', JSON.stringify(this.token));
                this.$router.push('/Products/'+2);
			})
            
            
        },
        RequestCancel(item){
            alert("send request to the admins ");
            console.log("estoy aki perro "+this.id);  
            axios.get(this.url+"user/admin/1")
            .then(response=>{
                console.log("token nav");
                console.log(response.data);
                let tokenAdmin = null
                let message = null
                tokenAdmin=response.data.adminToken.token_nav;
                console.log("el token del admin "+tokenAdmin);
                message = "El vendedor ha solicitado una cancelación";
                this.notification(tokenAdmin,message);
                
            })
            .catch(e=>{
             console.log("error "+e.response); 
            })
      
        },

        notification(tokenTo,message){
            const header = {
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":this.tokenfirebase,
                }
            }
            console.log("token admin navegador xxx "+tokenTo);
            const body = {
                "to":tokenTo,
                "notification":{
                    "title":"cancelar venta",
                    "body":message,
                    "icon": "./img/icons/android-chrome-192x192.png",
                }
            }
            const endpointfirebasenotification = "https://fcm.googleapis.com/fcm/send";
            axios.post(endpointfirebasenotification,body,header).then(response => {
                console.log("respuesta "+response);
            }).catch(error => {
                alert("Error al  notificar al administrador");
                console.log(error.message)
            })
        }
    },
	

}

</script>

