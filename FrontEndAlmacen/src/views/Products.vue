<template>
<body>
    <div class="container">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
						<h2><b>list products</b></h2>
					</div>
					<div class="col-sm-6">
                         <button class="submit" v-on:click="addProduct" >add new product</button> |
						 <button class="submit" v-on:click="CancelProduct" >cancel sold</button>	
					</div>
                </div>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>image</th>
						<th>name</th>
						<th>price</th>
                        <th>taxt</th>
                        <th>description</th>
						<th>quantity</th>
                    </tr>
                </thead>
                <tbody>					
					<tr v-for="(item,index) in products" v-bind:key="index" >
                        <td>{{item.id}}</td>
						<td class="w-35">
							 <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg" class="img-fluid img-thumbnail" alt="Sheep">
						</td>
						<td>{{item.product.name}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.tax}}</td>
						<td>{{item.product.description}}</td>
						<td>{{item.quantity}}</td>
						<td>
							<button v-on:click="AddNewPiece(item)" class="submit" > piece </button> 
						</td> 
						<td>
                            <button v-on:click="DeleteProduct(item)" class="submit" > expired </button>    
                        </td>
                        <td>
                            <button v-on:click="SellProduct(item)" class="submit" > sell </button>    
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
import axios from 'axios';
import Axios from 'axios';
export default {
    data(){
        return{
            token:'',
			rol:'',
			header:'',
			products:[],
			url:'',
			FotoUrl:'',
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
			axios.get(this.url+"inventory")
            .then(reponse=>{
				this.products=reponse.data.inventories;
				console.log("respuesta del servidor ");
				console.log(reponse.data);
				console.log("vector de products ")
				console.log(this.products[0].product.name);
            })
            .catch(e=>{
                console.log("error "+e.reponse); 
            })
		},
		addProduct:function(){
            console.log("add new product");
            this.$router.push('/AddProducts');
			console.log("enviar el token y el rol ");
			console.log("el token es "+this.token);
            localStorage.setItem('token', JSON.stringify(this.token));			
		},
		SellProduct:function(item){
			//alert("sell Product "+item.id);
			this.$router.push('/SoldProduct');
			localStorage.setItem('token',JSON.stringify(this.token));	
			localStorage.setItem('item',JSON.stringify(item.id));
		},
		DeleteProduct:function (item){
			//alert("prodcut expired "+item.id);
			this.$router.push('/ByExpired');
			localStorage.setItem('token',JSON.stringify(this.token));	
			localStorage.setItem('item',JSON.stringify(item.id));
		},
		AddNewPiece(item){
			//alert("add new piece "+item.id)
			console.log("estoy en add prooo ");
			this.$router.push('/NewPiecesProduct');
			localStorage.setItem('token',JSON.stringify(this.token));	
			localStorage.setItem('item',JSON.stringify(item.id));
			
		},
		CancelProduct:function(){
			//alert("cancel product ");
			console.log("estoy en calcel product ");
			this.$router.push('/ListSales');
			localStorage.setItem('token',JSON.stringify(this.token));	
		},
		
		/*start:function() {
            this.token=JSON.parse(localStorage.getItem("token")); 
			console.log("el vedadero token "+this.token);
			
            if(this.$router.history.current.path== '/Products/1'){
                console.log("administrado en en la caja ");
                this.rol=1;
                //console.log(" admin token "+this.token);
				//console.log(" admin rol "+this.rol);
				this.ListProducts();
				
                
            }
            if(this.$router.history.current.path== '/Products/2'){
               console.log("cajero en la caja ");
               this.rol=2;
               //console.log("cajero  token "+this.token);
			   //console.log("cajero rol "+this.rol);
			   this.ListProducts();
            }          
		},*/
		
    },
}
</script>

<style>

.container {
  padding: 2rem 0rem;
}

h4 {
  margin: 2rem 0rem 1rem;
}

.table-image {
 vertical-align: middle;
}
td,th {
   vertical-align: middle;
}

.table-wrapper {
        background: #fff;
        padding: 20px 25px;
        margin: 30px 0;
		border-radius: 3px;
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
    }
	.table-title {        
		padding-bottom: 15px;
		background: #435d7d;
		color: #fff;
		padding: 16px 30px;
		margin: -20px -25px 10px;
		border-radius: 3px 3px 0 0;
    }
    .table-title h2 {
		margin: 5px 0 0;
		font-size: 24px;
	}
	.table-title .btn-group {
		float: right;
	}
	.table-title .btn {
		color: #fff;
		float: right;
		font-size: 13px;
		border: none;
		min-width: 50px;
		border-radius: 2px;
		border: none;
		outline: none !important;
		margin-left: 10px;
	}
	.table-title .btn i {
		float: left;
		font-size: 21px;
		margin-right: 5px;
	}
	.table-title .btn span {
		float: left;
		margin-top: 2px;
	}
    table.table tr th, table.table tr td {
        border-color: #e9e9e9;
		padding: 12px 15px;
		vertical-align: middle;
    }
	table.table tr th:first-child {
		width: 60px;
	}
	table.table tr th:last-child {
		width: 100px;
	}
    table.table-striped tbody tr:nth-of-type(odd) {
    	background-color: #fcfcfc;
	}
	table.table-striped.table-hover tbody tr:hover {
		background: #f5f5f5;
	}
    table.table th i {
        font-size: 13px;
        margin: 0 5px;
        cursor: pointer;
    }	
    table.table td:last-child i {
		opacity: 0.9;
		font-size: 22px;
        margin: 0 5px;
    }
	table.table td a {
		font-weight: bold;
		color: #566787;
		display: inline-block;
		text-decoration: none;
		outline: none !important;
	}
	table.table td a:hover {
		color: #2196F3;
	}
	table.table td a.edit {
        color: #FFC107;
    }
    table.table td a.delete {
        color: #F44336;
    }
    table.table td i {
        font-size: 19px;
    }
	table.table .avatar {
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 10px;
	}
    .pagination {
        float: right;
        margin: 0 0 5px;
    }
    .pagination li a {
        border: none;
        font-size: 13px;
        min-width: 30px;
        min-height: 30px;
        color: #999;
        margin: 0 2px;
        line-height: 30px;
        border-radius: 2px !important;
        text-align: center;
        padding: 0 6px;
    }
    .pagination li a:hover {
        color: #666;
    }	
    .pagination li.active a, .pagination li.active a.page-link {
        background: #03A9F4;
    }
    .pagination li.active a:hover {        
        background: #0397d6;
    }
	.pagination li.disabled i {
        color: #ccc;
    }
    .pagination li i {
        font-size: 16px;
        padding-top: 6px
    }
    .hint-text {
        float: left;
        margin-top: 10px;
        font-size: 13px;
    }    
	/* Custom checkbox */
	.custom-checkbox {
		position: relative;
	}
	.custom-checkbox input[type="checkbox"] {    
		opacity: 0;
		position: absolute;
		margin: 5px 0 0 3px;
		z-index: 9;
	}
	.custom-checkbox label:before{
		width: 18px;
		height: 18px;
	}
	.custom-checkbox label:before {
		content: '';
		margin-right: 10px;
		display: inline-block;
		vertical-align: text-top;
		background: white;
		border: 1px solid #bbb;
		border-radius: 2px;
		box-sizing: border-box;
		z-index: 2;
	}
	.custom-checkbox input[type="checkbox"]:checked + label:after {
		content: '';
		position: absolute;
		left: 6px;
		top: 3px;
		width: 6px;
		height: 11px;
		border: solid #000;
		border-width: 0 3px 3px 0;
		transform: inherit;
		z-index: 3;
		transform: rotateZ(45deg);
	}
	.custom-checkbox input[type="checkbox"]:checked + label:before {
		border-color: #03A9F4;
		background: #03A9F4;
	}
	.custom-checkbox input[type="checkbox"]:checked + label:after {
		border-color: #fff;
	}
	.custom-checkbox input[type="checkbox"]:disabled + label:before {
		color: #b8b8b8;
		cursor: auto;
		box-shadow: none;
		background: #ddd;
	}



</style>