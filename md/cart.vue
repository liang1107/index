<template>
    <div class="flex"  @scroll="top()">
        <div class="carthou" v-if="show">
            <div class="kong">
             <img src="https://s1.ricebook.com/feck/web-cart/37cea7f9c3bd1d34c0eca258281ff871.png"/>
            </div>
            <div class="ou">购物车是空的哦~</div>
        </div>
        <div class="carthou" v-if="!show">
            <ul>
                <li v-for="(it,index) in goods" :key="index">
                    <div class="dui1">
                         <span class="iconfont dui" style="border:0px;"></span> 
                    </div>
                    <div class="im">
                        <img class="lazy" src="tool/img.gif" :data-echo="it.data.product_images[0].img_url"/>
                        <!-- <img :src="it.data.product_images[0].img_url"/> -->
                    </div>
                    <div class="godright">
                        <div class="title">{{it.data.name}}</div>
                        <div class="danjia">单价：<span class="dan">{{it.data.price/100}}</span> 元</div>
                        <div class="dela">
                            <span @click="jian(it.id,index)">-</span>
                            <span class="shu">{{it.num}} </span>
                            <span @click="jia(it.id,index)">+</span>
                            <i class="shan" @click="delet(it.id,index)">X</i>
                        </div>
                        
                    </div>
                </li>
            </ul>
        </div>
        <div class="lick">
            <p>猜你喜欢 </p>
            <div class="licklist">
                <ul>
                    <li v-for="(it,index) in list.content" :key="index" @click="delate(it.enjoy_url)">
                        <img class="lazy" src="tool/img.gif" :data-echo="it.product_image"/>
                        <!-- <img :src="it.product_image"/> -->
                        <div class="title">{{it.name}} </div>
                        <div class="jiage">{{it.price/100}}元  /{{it.show_entity_name}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cartfooter" v-if="!show">
            <div class="cleft">
                 <span class="iconfont dui" style="border:0px;"></span> 
                <span>全选</span>
                <span class="heji">合计：{{jiage}}元</span>
            </div>
            <div class="cright" @click="pay()">去结算</div>
        </div>
        <div class="home" @click="gohome()">首页</div>
    </div>
</template>


<script>
import "./../scss/cart.scss";
import Ajax from "./../tool/MyAjax";
    export default {
        data(){
            return {
               show:true ,
               list:{},
               jiage:0,
               goods:[],
               shibei:""
            }
        },
       updated(){
            echo.init({
                offset: 0,
            　　 throttle: 0 ,
                unload: false,
                callback: function (element, op) {
                console.log(element, 'has been', op + 'ed')
            }
            }); 
         this.jisuan()
       },
        mounted(){
            if(localStorage.getItem("goods") && JSON.parse(localStorage.getItem("goods")).length!=0){
                this.show=false;
            }else{
                this.show=true;
            }
            
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

            
            var url="https://api.ricebook.com/3/enjoy_product/cart_recommend_product.json?city_id=1";
             var that = this;
        Ajax.vueJson(url, function (data) {
            // console.log(data);
            that.list=data
            
        }, function (err) { console.log(err) })

        },
        methods:{
        	pay(){
        		var money=$(".heji").html().replace("合计：","").replace("元","");
        		console.log(money);
        		this.$router.push({
        			path:"pay",
        			query:{
        				money:money
        			}
        		})
        	},
            top(){
                echo.init({
                    offset: 0,
                　　 throttle: 0 ,
                    unload: false,
                    callback: function (element, op) {
//                  console.log(element, 'has been', op + 'ed')
                }
                }); 
            },
            gohome(){
                this.$router.push({
                    path:"home"
                })
            },
            jisuan(){
                  var leng=$(".carthou ul li").length
                  console.log(leng)
                var a=0;
                var jiage=0
               for(var a=0;a<leng;a++){
                    console.log(1111111)
                    console.log(Number($(".carthou .dan").eq(a).text()),Number($(".carthou .shu").eq(a).text()))
                    jiage=Number($(".carthou .dan").eq(a).text())*Number($(".carthou .shu").eq(a).text())+jiage
                       
               }
                // if(localStorage.getItem("zhen")){
                //     var zhen=localStorage.getItem("zhen")+jiage;
                //     localStorage.setItem("zhen",zhen)

                // }else{
                //     localStorage.setItem("zhen",jiage)
                // }
               
                $(".heji").html("合计："+jiage+"元")
           
            },
             delate(data){
                
                var arr=data.split("?")[1]
                console.log(arr);
                this.$router.push({
                    path:"detail",
                    query:{
                        url:arr
                    }
                })
                
            },
            jia(index,shu){
                this.shibei=""
                var arr=JSON.parse(localStorage.getItem("goods"));
                for(var i in arr){
                    console.log(arr[i].id)
                    if(arr[i].id==index){
                        arr[i].num++
                        $(".carthou ul li .shu").eq(shu).html(arr[i].num)
                    }
                }
                console.log(arr)
                localStorage.setItem("goods",JSON.stringify(arr));
                this.jisuan()
                
            },
             jian(index,shu){
                this.shibei=""
                var arr=JSON.parse(localStorage.getItem("goods"));
                for(var i in arr){
                    console.log(arr[i].id)
                    if(arr[i].id==index){
                       if(arr[i].num==1){
                           arr[i].num=1;
                       }else{
                             arr[i].num--     
                       }
                       $(".carthou ul li .shu").eq(shu).html(arr[i].num)
                    }
                }
                console.log(arr)
                localStorage.setItem("goods",JSON.stringify(arr));
               this.jisuan()
            },
            delet(index,shu){
                console.log(index);
                console.log(localStorage.getItem("goods"))
                var arr=JSON.parse(localStorage.getItem("goods"));
                for(var i in arr){
                    console.log(arr[i].id)
                    if(arr[i].id==index){
                        arr.splice(i,1)
                        console.log(i)
                    }
                }
                console.log(arr)
                localStorage.setItem("goods",JSON.stringify(arr));
                if(arr.length==0){
                    console.log('删除全部了')
                     this.show=true;

                   
                }
               $(".carthou ul li").eq(shu).css({
                   display:'none'
               })
              

            }
        }
    }
</script>

<style scoped>
    .home{
        position: fixed;
        bottom:20%;font-size:12px;line-height: 40px;text-align: center;
        left:10px;
        /* border: 1px solid #000; */
        height: 40px;width: 40px;
        border-radius: 50%;
        background: rgba(0,0,0,.4)
    }
</style>
