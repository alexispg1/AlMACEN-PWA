<template>
  <div class="table-wrapper">
      <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6"><h2> <b>Transactions Products</b></h2></div>
                    </div>
                </div>       
                <table class="table table-striped table-hover" >
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">type</th>
                            <th scope="col">decription</th>
                            <th scope="col">Created &nbsp; On</th>
                            <th scope="col">update &nbsp;  &nbsp; On</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in items" v-bind:key="index"  ata-status="activate">
                            <td>{{item.id}}</td>
                            <td v-if="item.type===1">added</td>
                            <td v-else-if="item.type===2">sold</td>
                            <td v-else-if="item.type===3">removed</td>
                            <td>{{item.description}}</td>
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
            url:'',
            items: [],
        }
    },
    mounted() {
       this.ListTransactions();
    },
    methods:{
        ListTransactions(){
            console.log("Componente listo");
            this.url = "https://warehousev1.herokuapp.com/api/v1/";
            axios.get(this.url + "transaction")
            .then(response => {
            this.items= response.data.transaction;
            console.log(response.data)
            console.log("transactiosn en el vector "+this.items);
            }).catch(e => {
                alert("el error es  "+e.response);
                })   
        },
    }
}

</script>

<style >
.table-wrapper {
        width: 850px;
        background: #fff;
        padding: 20px 30px 5px;
        margin: 30px auto;
        box-shadow: 0 0 1px 0 rgba(0,0,0,.25);
    }
	.table-title .btn-group {
		float: right;
	}
	.table-title .btn {
		min-width: 50px;
		border-radius: 2px;
		border: none;
		padding: 6px 12px;
		font-size: 95%;
		outline: none !important;
		height: 30px;
	}
    .table-title {
		border-bottom: 1px solid #e9e9e9;
		padding-bottom: 15px;
		margin-bottom: 5px;
		background: rgb(0, 50, 74);
		margin: -20px -31px 10px;
		padding: 15px 30px;
		color: #fff;
    }
    .table-title h2 {
		margin: 2px 0 0;
		font-size: 24px;
	}
    table.table tr th, table.table tr td {
        border-color: #e9e9e9;
		padding: 12px 15px;
		vertical-align: middle;
    }
	table.table tr th:first-child {
		width: 40px;
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
    table.table td a {
        color: #2196f3;
    }
	table.table td .btn.manage {
		padding: 2px 10px;
		background: #37BC9B;
		color: #fff;
		border-radius: 2px;
	}
	table.table td .btn.manage:hover {
		background: #2e9c81;		
	}

</style>