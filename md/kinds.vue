<template>
    <div class="flex" @scroll="top($event)">
        <header class="header">
            <div class="commonHeader">
                <div class="back"><router-link :to="{name:'home'}">首页</router-link></div>
                <div class="title" @click="show()">ENJOY
                    <span class="iconfont" :cityid="cityid">{{chengshi}} &#xe610;</span>
                </div>
                <div class="moreInfo">
                    <span><router-link to="login">登录</router-link></span>
                    <span class="iconfont" @click="show11()">&#xe642;</span>
                </div>
            </div>
        <!-- 搜索狂 -->
            <div class="saosuo" v-show="show1">
                <div class="sou1">
                    <input type="text" placeholder="搜索本地精选 / 快递到家" />
                    <span @click="search()">搜索</span>
                    <div class="jiao"></div>
                </div>
            </div>
        </header>
        <div id="content" v-if="!wo">
            <div id="di">
                <p>© 2016 ENJOY</p>
                <p>京ICP备12040847</p>
                <p>京公网安备11010502025574 京ICP证150031号</p>
            </div>
        </div>
         <img v-if="!wo" class="jiazai" src="tool/img.gif"/>
        <div id="content" v-if="wo">
            <div class="ulq" >
                <ul>
                    <li>全部</li>
                    <li @click="xian()">{{zhi}} </li>
                </ul>
                <div class="shai" v-show="shai">
                    <div class="shai1" v-for="it in xuan1" @click="sort($event,it.sort_id)" :sort="it.sort_id">{{it.sort_name}} </div>
                </div>
            </div>
             <div class="kindslist" v-for=" it in list" @click="delate(it.enjoy_url)">
        
                <div class="img"><img :src="it.product_image"/></div>
                <div class="fe">
                    <div class="p1"><p>{{it.name}} </p></div>
                    <div class="red">{{it.price/100}}元/份<span v-if="it.original_price">￥{{it.original_price/100}}</span></div>
                </div>
            </div>
            
            <div class="city" v-show="ishow">
                <h1>本地服务开通城市</h1>
                <div class="citys">
                    <span v-for="(i,index) in city">
                           <div v-for="(it,ind) in i"  @click="xuan($event)" :cityid="ind">{{it}}</div>
                    </span>
                    
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Vue from "vue";
import VueRouter from "vue-router";
import { Toast } from 'mint-ui';
import "./../scss/kinds.scss";
import Ajax from "./../tool/MyAjax";
Vue.use(VueRouter)
    var router=new VueRouter({
   
        }) 
    export default {
        
        data(){
            return {
                wo:false,
               ishow:false,
               show1:false,
               shai:false,
               cityid:104,
               list:[],
                num:0,
                city:[{104:"上海"},{140:"北京"},{144:"南京"},{185:"天津"},{216:"广东"},{235:"成都"},
               {260:"杭州"},{299:"深圳"},{347:"苏州"},{362:"西安"},{388:"重庆"},{401:"长沙"}],
               chengshi:"",
               xuan1:[],
               zhi:"智能排序",
               id:1
              
            }
        },
        // watch:{
        //     cityid(new1,old){
        //         // console.log(new1,old)
        //         this.list=[];
        //          var url1="https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id="+this.cityid+"&page="+this.num;
                   
        //            var that=this;
        //             Ajax.vueJson(url1,function(data){
        //                 console.log(data,"监听");
        //                 that.list=data;
                    
        //             },function(err){console.log(err)})
        //     }
        // },
        methods:{
            sort(even,id){
                console.log(id)
                this.zhi=even.target.innerHTML;
                this.shai=false;
                $(".shai1").css({
                    background:"#fff",
                    color:"#000"
                })
                even.target.style.color="#F66";
                even.target.style.background="#fff";
                this.id=id;
                this.list=[];
                var that =this
                var url = "https://api.ricebook.com/4/tab/category_product_list.json?category_id="
                +id+"&sort="+this.id+"&from_id=0&city_id="+this.cityid+"&page=0"
                Ajax.vueJson(url,function(data){
                    console.log(data);
                    that.list=data
                },function(err){console.log(err)});
            },
            xian(){
                if(this.shai){
                    this.shai=false;
                }else{
                    this.shai=true;
                }
            },
            search(){
                var word=$(".sou1 input").val()
                if(word!=""){
                     router.push({
                        path:"search",
                        query:{
                            query_k:word
                        }
                    })
                }
                   
            },
            delate(data){
                
                var arr=data.split("?")[1]
                console.log(arr);
                router.push({
                    path:"detail",
                    query:{
                        url:arr
                    }
                })
                
            },
            show(){
                if(this.ishow){
                    this.ishow=false;
                }else{
                    this.ishow=true;
                }

            },
             show11(){
                if(this.show1){
                    this.show1=false;
                }else{
                    this.show1=true;
                }

            },
             xuan(event){
                // console.log(event.target.innerText)
                var arr=this.city;
                var cheng=event.target.innerText;
                this.chengshi=cheng;
                // console.log(event.target.getAttribute("cityid"))
                  this.cityid=event.target.getAttribute("cityid");
                localStorage.setItem("city",event.target.getAttribute("cityid"))

               
                    this.ishow=false;
                    console.log(this.cityid,"结束")
              
                    
            },
            top(event){
                // console.log(event.target.scrollTop)
                // console.log(event.target.offsetHeight);
                // console.log(event.target.scrollHeight);
                var sh=event.target.scrollHeight;
                var h=event.target.offsetHeight;
                var t=event.target.scrollTop;
                var id=this.$route.query.id;
                var cityid=this.cityid;
                var that=this;
                if(sh==h+t ){
                    console.log("加载");
                    this.num++;
                    // console.log(this.num);
                    var url = "https://api.ricebook.com/4/tab/category_product_list.json?category_id="
                +id+"&sort="+this.id+"&from_id=0&city_id="+cityid+"&page="+this.num
                        Ajax.vueJson(url,function(data){
                            console.log(data);
                            for(var itm of data){
                                that.list.push(itm)
                            }
                            
                        },function(err){console.log(err)})
                }
            }
            
        },
        computed:{
           
        },
        mounted(){
                if(localStorage.getItem("city")){
                    this.cityid=localStorage.getItem("city")
                    var arr=this.city;
                    for(var it of arr){
                        // console.log(it,"aaaa")
                        for(var i in it){
                            
                            if(i==localStorage.getItem("city")){
                                console.log(it[i])
                                this.chengshi=it[i]
                            }
                        }
                    }
                }else{
                    localStorage.setItem("city",this.cityid);
                    var arr=this.city;
                    for(var it of arr){
                        console.log(it,"aaaa")
                        for(var i in it){
                            if(i==localStorage.getItem("city")){
                                 this.chengshi=it[i]
                            }
                        }
                    }
                }
              var cityid=this.cityid;
              console.log(this.$route)
              var id=this.$route.query.id;
              console.log(id)
                var that =this
                var url = "https://api.ricebook.com/4/tab/category_product_list.json?category_id="
                +id+"&sort="+this.id+"&from_id=0&city_id="+cityid+"&page=0"
                Ajax.vueJson(url,function(data){
                    console.log(data);
                    that.list=data
                    if(data.length==0){
                    }else{
                        that.wo=true
                    }
                },function(err){console.log(err)});
                var url1="https://api.ricebook.com/4/tab/sub_category.json?category_id="
                +id+"&sort=1&from_id=0&city_id="+cityid+"&page=0"
                 Ajax.vueJson(url1,function(data){
                    console.log(data);
                    that.xuan1=data.sort;
                    
                },function(err){console.log(err)});
            
        }
            

    
    }
   
</script>

<style scoped>
    #content{
        display: block;
        background: #fff;
    }
   .jiazai{
            position: fixed;
            top:50%;
            left: 50%;
            transform: translate(-30px,-30px);
            
    }
    
</style>
