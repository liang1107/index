<template>
    <div class="flex" id="content1">
      	
        <div id="paycontent">
        	<div class="back12">
	      		<router-link to="cart">返回</router-link>
	      	</div>
           <h4>商品列表:</h4>
           <ul>
	        	<li v-for="item in goods">
	        		<div class="goodsname">{{item.data.name}}</div>
	        		<div class="money">
	        			<span>{{item.data.price/100}}元</span>
	        			<span>{{item.num}}份</span>
	        		</div>
	        	</li>
	        </ul>
	        <div class="xian"></div>
	        <div class="zonggong">
	        	<div class="right">总共合计：{{zonghe}}元</div>
	        </div>
	        <div class="payfooter">
	        	<div class="pfoo">合计：{{zonghe}}元</div>
	        	<div class="qian">去支付</div>
	        </div>
        </div>
        
        
        
    </div>
</template>


<script>
import Vue from "vue"
import "./../scss/pay.scss"
import Ajax from "./../tool/MyAjax";
    export default {
        data(){
            return {
             goods:[],
             zonghe:0
            }
        },
        mounted(){
//      		console.log(this.$route.query.money)
        		this.zonghe=this.$route.query.money
        	 var arr=JSON.parse(localStorage.getItem("goods"));
            console.log(arr)
            for(let i in arr){
                var url1="https://api.ricebook.com/product/info/product_detail.json?product_"+arr[i].url
                console.log(url1);
                  var that = this;
                Ajax.vueJson(url1, function (data) {
                   
                    var obg={data:data.basic,num:arr[i].num,id:arr[i].id}
                     console.log(obg);
                    that.goods.push(obg)
                    
                }, function (err) { console.log(err) })

            }
        }
    }
</script>

<style scoped>
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
        }
</style>
